<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { cloneDeep, groupBy } from 'lodash';
import { FieldArray, FieldEntry, InvalidSubmissionHandler, SubmissionHandler } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { Food, useAdminFoodStore } from 'entities/food';
import { Notify, useLoadingAction } from 'shared/lib';
import { SConfirmDialog, SListControls, SForm, SInput, SBtn } from 'shared/ui';
import NutritionListHeader from './NutritionListHeader.vue';

export interface FFoodListFormProps {
  type: Food['type'];
  initValues?: z.infer<typeof schema>;
  cleanOnCreate?: boolean;
  disableSubmitBtn?: boolean;
}

const categories = [1, 2, 3] as const;
const props = defineProps<FFoodListFormProps>();
const { t } = useI18n();

const { deleteFood, postFood, patchFood, foodList } = useAdminFoodStore();

const form = ref<InstanceType<typeof SForm>>();
// const schema = z.object({ foods: z.array(Food.validation().partial()) });
const schema = z.object(Object.fromEntries(categories.map((cat) => [cat, z.array(Food.validation().partial())])));
const validationSchema = toTypedSchema(schema);

// Save init values to compare later
// Alternative solution: add "onchange" listener to SInput inside form
const prevFoods = ref(cloneDeep(props.initValues));
const onsubmit = (values: z.infer<typeof schema>) => {
  if (!props.type || props.type.length == 0) {
    Notify.simpleError(t('admin.nutrition.errors.typeRequired'));
    return;
  }

  const flattenValue = Object.values(values)
    .flatMap((v) => v)
    .filter((item) => item.name && item.name.length > 0);

  const isAnyValidItem = flattenValue.length > 0;

  if (!isAnyValidItem) {
    Notify.simpleError(t('admin.nutrition.errors.atLeastOneRequired'));
    return;
  }

  for (const category of categories) {
    const { false: maybeChangedValues, true: completelyNewValues } = groupBy(
      values[category],
      ({ id }) => id === undefined,
    );

    //Check for updates
    if (maybeChangedValues?.length > 0)
      for (let i = 0; i < maybeChangedValues.length; i++) {
        const food = maybeChangedValues[i];
        const prevFood = prevFoods.value?.[category][i];

        if (!prevFood) {
          console.warn('Unreachable');
          return;
        } else if (food.name !== prevFood?.name) {
          useLoadingAction(foodList.updateState, () => patchFood({ id: prevFood.id!, name: food.name }));
        }
      }

    //Push completely new items to api
    if (completelyNewValues?.length > 0) {
      for (let food of completelyNewValues) {
        useLoadingAction(foodList.createState, () => {
          if (!food.name) return;
          postFood({ name: food.name, type: props.type, category });
        });
      }
    }
  }

  if (props.cleanOnCreate) {
    form.value?.resetForm();
    prevFoods.value = {};
  }
};

const isConfirmDialogShown = ref([false, false, false]);
const removeItemIdx = ref<number>();
const onremove = (id: number, category: (typeof categories)[number]) => {
  isConfirmDialogShown.value[category] = true;
  foodList.deleteState.error();
  removeItemIdx.value = id;
};

const initVals = ref<z.infer<typeof schema>>(props.initValues ?? {});
onBeforeMount(() => {
  for (const category of categories) {
    if (!initVals.value[category]) initVals.value[category] = [];
    if (!initVals.value[category].length) initVals.value[category].push({ name: '', category });
  }
  console.log(initVals.value);
});
defineExpose({
  resetForm: () => form.value?.resetForm(),
  handleSubmit: (cb: SubmissionHandler, cbe?: InvalidSubmissionHandler) => form.value?.handleSubmit(cb, cbe),
});
</script>

<template>
  <SForm
    ref="form"
    @submit="onsubmit"
    :field-schema="validationSchema"
    :disable-submit-btn="disableSubmitBtn"
    :init-values="initVals"
    p="0!"
  >
    <FieldArray v-for="category in categories" :key="category" :name="`${category}`" v-slot="{ fields, push, remove }">
      <NutritionListHeader :category="category" />
      <div
        v-for="(field, idx) in fields as FieldEntry<Food>[]"
        :key="field.key"
        w-full
        flex
        flex-row
        items-center
        gap-x-0.5rem
      >
        <SInput :name="`${category}.${idx}.name`" :label="$t('admin.nutrition.name')" w-full />
        <SBtn
          @click="
            () => {
              if (field.value.id) onremove(idx, category);
              else remove(idx);

              if (fields.length < 1) push({ name: '', category });
            }
          "
          :icon="symRoundedDelete"
          bg="bg!"
        />
      </div>

      <SListControls disabled-remove disabled-submit @add="push({ name: '', category })" mt-0.5rem />
      <SConfirmDialog
        v-model="isConfirmDialogShown[category]"
        @confirm="
          () => {
            const _fields = fields as FieldEntry<Food>[];
            if (removeItemIdx === undefined) {
              console.error('removeItemIndex should not be undefined');
              return;
            }

            // Order is important! If 'remove' stays before 'deleteFood', it will delete the wrong item
            useLoadingAction(foodList.deleteState, () => deleteFood({ id: _fields[removeItemIdx!].value.id! }));
            remove(removeItemIdx);
            //TODO: prevent deletion of food type if last item was deleted?
          }
        "
        type="deletion"
      />
    </FieldArray>
  </SForm>
</template>
