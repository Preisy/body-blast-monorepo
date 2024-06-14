<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { omit } from 'lodash';
import { FieldArray } from 'vee-validate';
import { z } from 'zod';
import {
  AdminNutrition,
  Nutrition,
  useAdminNutritionStore,
} from 'entities/nutrition';
import { useLoadingAction } from 'shared/lib';
import {
  SConfirmDialog,
  SListControls,
  SForm,
  SInput,
  SLoading,
} from 'shared/ui';
import NutritionListHeader from './NutritionListHeader.vue';

export interface FNutritionListFormProps {
  title: string;
  nutritionId: Nutrition['id'];
  initValues?: Array<Nutrition.Item>;
}
const categories = [1, 2, 3] as const;

const props = defineProps<FNutritionListFormProps>();
const { patchNutrition, nutritionList } = useAdminNutritionStore();
const form = ref<Array<InstanceType<typeof SForm>>>();

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
  console.log(values);

  const flattenValue = Object.values(values)
    .flatMap((v) => v.mealItems)
    .map((item) => omit(item, 'nutritionId'))
    .filter((item) => item.category && item.quantity && item.type);

  useLoadingAction(nutritionList.updateState, () => {
    patchNutrition({
      id: props.nutritionId,
      name: props.title,
      mealItems: flattenValue as AdminNutrition.Patch.Dto['mealItems'],
    });
  });
};

type TInitCategory = { mealItems: Partial<Nutrition.Item>[] };
const init = computed<{
  category_1: TInitCategory;
  category_2: TInitCategory;
  category_3: TInitCategory;
}>(() => {
  const result = {
    category_1: {
      mealItems:
        props.initValues?.filter((v) => v.category == 1) ??
        ([] as Partial<Nutrition.Item>[]),
    },
    category_2: {
      mealItems:
        props.initValues?.filter((v) => v.category == 2) ??
        ([] as Partial<Nutrition.Item>[]),
    },
    category_3: {
      mealItems:
        props.initValues?.filter((v) => v.category == 3) ??
        ([] as Partial<Nutrition.Item>[]),
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
    <SLoading v-if="!props.initValues" />

    <SForm
      v-else
      ref="form"
      :field-schema="validationSchema"
      :init-values="init"
      @submit="onsubmit"
      p="0!"
    >
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
              <SInput
                :name="`category_${category}.mealItems[${idx}].type`"
                :label="$t('admin.nutrition.type')"
              />
              <SInput
                :name="`category_${category}.mealItems[${idx}].quantity`"
                :label="$t('admin.nutrition.quantity')"
              />
            </div>
            <SListControls
              disabled-submit
              :disabled-add="idx != fields.length - 1"
              @add="push({ type: '', quantity: '', category })"
              @remove="remove(idx)"
              my-0.5rem
            />
            <!-- TODO: call push, if after remove there is no items -->
          </div>
        </div>
      </FieldArray>
    </SForm>

    <SConfirmDialog
      v-model="isConfirmDialogShown"
      @confirm="onRemoveConfirm"
      type="deletion"
    />
  </div>
</template>
