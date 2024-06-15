<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { omit } from 'lodash';
import { FieldArray } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { AdminNutrition, Nutrition, useAdminNutritionStore } from 'entities/nutrition';
import { User } from 'shared/api';
import { Notify, useLoadingAction } from 'shared/lib';
import { SConfirmDialog, SListControls, SForm, SInput, SLoading } from 'shared/ui';
import NutritionListHeader from './NutritionListHeader.vue';

export interface FNutritionListFormProps {
  mode: 'create' | 'update';
  title: string;
  id: Nutrition['id'] | User['id'];
  isNeedInit?: boolean;
  isNeedReset?: boolean;
  initValues?: Array<Nutrition.Item>;
}
const categories = [1, 2, 3] as const;

const props = withDefaults(defineProps<FNutritionListFormProps>(), {
  isNeedInit: false,
  isNeedReset: false,
});
const emit = defineEmits<{
  submit: []; //Fired AFTER pushing request to api
}>();

const { t } = useI18n();

const { patchNutrition, postNutrition, nutritionList } = useAdminNutritionStore();
const form = ref<InstanceType<typeof SForm>>();

// Deletion dialog ref
const isConfirmDialogShown = ref<boolean>();
// const removeItemIndex = ref<number>(); // index to deletion
const onRemoveConfirm = () => console.log('Deletion confirmed');

const schema = z.object({
  category_1: Nutrition.validation().partial(),
  category_2: Nutrition.validation().partial(),
  category_3: Nutrition.validation().partial(),
});

const validationSchema = toTypedSchema(schema);

const onsubmit = (values: z.infer<typeof schema>) => {
  if (props.title.length == 0) {
    Notify.simpleError(t('admin.nutrition.errors.titleRequired'));
    return;
  }

  const flattenValue = Object.values(values)
    .flatMap((v) => v.mealItems)
    .map((item) => omit(item, 'nutritionId'))
    .filter((item) => item.category && item.quantity && item.type);

  const isAnyValidItem = flattenValue.some((i) => i.type && i.quantity && i.type.length > 0 && i.quantity.length > 0);

  if (!isAnyValidItem) {
    Notify.simpleError(t('admin.nutrition.errors.atLeastOneRequired'));
    return;
  }

  if (props.mode == 'create')
    useLoadingAction(nutritionList.createState, () => {
      postNutrition({
        userId: props.id,
        name: props.title,
        mealItems: flattenValue as AdminNutrition.Patch.Dto['mealItems'],
      });
    });

  if (props.mode == 'update')
    useLoadingAction(nutritionList.updateState, () => {
      patchNutrition({
        id: props.id,
        name: props.title,
        mealItems: flattenValue as AdminNutrition.Patch.Dto['mealItems'],
      });
    });

  if (props.isNeedReset) form.value?.resetForm();
  emit('submit');
};

type TInitCategory = { mealItems: Partial<Nutrition.Item>[] };
const init = computed<{
  category_1: TInitCategory;
  category_2: TInitCategory;
  category_3: TInitCategory;
}>(() => {
  const result = {
    category_1: {
      mealItems: props.initValues?.filter((v) => v.category == 1) ?? ([] as Partial<Nutrition.Item>[]),
    },
    category_2: {
      mealItems: props.initValues?.filter((v) => v.category == 2) ?? ([] as Partial<Nutrition.Item>[]),
    },
    category_3: {
      mealItems: props.initValues?.filter((v) => v.category == 3) ?? ([] as Partial<Nutrition.Item>[]),
    },
  };
  for (const category in result) {
    const categoryItems = result[category as keyof typeof result].mealItems;
    if (categoryItems.length == 0) {
      categoryItems.push({
        type: '',
        quantity: '',
        category: Number(category.split('_')[1]),
      });
    }
  }
  return result;
});
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <SLoading v-if="initValues === undefined && isNeedInit" />

    <SForm v-else ref="form" :field-schema="validationSchema" :init-values="init" @submit="onsubmit" p="0!">
      <FieldArray
        v-for="category in categories"
        :key="category"
        :name="`category_${category}.mealItems`"
        v-slot="{ fields, push, remove }"
      >
        <div py-1rem>
          <NutritionListHeader :category="category" :title="title" />
          <div v-for="(field, idx) in fields" :key="field.key">
            <div flex gap-x-0.5rem>
              <SInput :name="`category_${category}.mealItems[${idx}].type`" :label="$t('admin.nutrition.type')" />
              <SInput
                :name="`category_${category}.mealItems[${idx}].quantity`"
                :label="$t('admin.nutrition.quantity')"
              />
            </div>

            <SListControls
              disabled-submit
              :disabled-add="idx != fields.length - 1"
              @add="push({ type: '', quantity: '', category })"
              @remove="
                remove(idx);
                if (fields.length == 0) push({ type: '', quantity: '', category });
              "
              my-0.5rem
            />
          </div>
        </div>
      </FieldArray>
    </SForm>

    <SConfirmDialog v-model="isConfirmDialogShown" @confirm="onRemoveConfirm" type="deletion" />
  </div>
</template>
