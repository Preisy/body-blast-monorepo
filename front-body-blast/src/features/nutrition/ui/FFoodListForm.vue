<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { cloneDeep, groupBy } from 'lodash';
import { FieldArray, FieldEntry, InvalidSubmissionHandler, SubmissionHandler } from 'vee-validate';
import { z } from 'zod';
import { Food, useAdminFoodStore } from 'entities/food';
import { Notify, useLoadingAction } from 'shared/lib';
import { SConfirmDialog, SListControls, SForm, SInput, SBtn } from 'shared/ui';
import NutritionListHeader, { NutritionListHeaderProps } from './NutritionListHeader.vue';

export interface FFoodListFormProps {
  category: NutritionListHeaderProps['category'];
  type: Food['type'];
  initValues?: Array<Food>;
  cleanOnCreate?: boolean;
  disableSubmitBtn?: boolean;
}

const props = defineProps<FFoodListFormProps>();
const emit = defineEmits<{
  submit: [values: { foods: Array<Food> }];
}>();

const { deleteFood, postFood, patchFood, foodList } = useAdminFoodStore();

const form = ref<InstanceType<typeof SForm>>();
const validationSchema = toTypedSchema(z.object({ foods: z.array(Food.validation().partial()) }));

// Save init values to compare later
// Alternative solution: add "onchange" listener to SInput inside form
const prevFoods = ref(cloneDeep(props.initValues));
const onsubmit = (values: { foods: Array<Food> }) => {
  emit('submit', values);
  const { false: maybeChangedValues, true: completelyNewValues } = groupBy(values.foods, ({ id }) => id === undefined);
  let needToNotify = false;

  //Check for updates
  if (maybeChangedValues?.length > 0)
    for (let i = 0; i < maybeChangedValues.length; i++) {
      const food = maybeChangedValues[i];
      const prevFood = prevFoods.value?.[i];

      if (!prevFood) {
        console.warn('Unreachable');
        return;
      } else if (food.name !== prevFood?.name) {
        useLoadingAction(foodList.updateState, () => patchFood({ id: prevFood!.id, name: food.name }));
        needToNotify = true; // TODO: check updateState/createState for success
      }
    }

  //Push completely new items to api
  if (completelyNewValues?.length > 0) {
    for (let food of completelyNewValues) {
      useLoadingAction(foodList.createState, () => postFood({ ...food, type: props.type, category: props.category }));
    }
    needToNotify = true;
  }

  if (props.cleanOnCreate) {
    form.value?.resetForm();
    prevFoods.value = [];
  }
  if (needToNotify) Notify.updateSuccess();
};

const isConfirmDialogShown = ref<boolean>();
const removeItemIndex = ref<number>();
const onremove = (index: number) => {
  isConfirmDialogShown.value = true;
  foodList.deleteState.error();
  removeItemIndex.value = index;
};

const initVals = ref<Partial<Food>[]>(props.initValues ?? []);
onBeforeMount(() => {
  if (!initVals.value.length) initVals.value.push({ name: '' });
});
defineExpose({
  resetForm: () => form.value?.resetForm(),
  handleSubmit: (cb: SubmissionHandler, cbe?: InvalidSubmissionHandler) => form.value?.handleSubmit(cb, cbe),
});
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <NutritionListHeader :category="category" />

    <SForm
      ref="form"
      @submit="onsubmit"
      :field-schema="validationSchema"
      :init-values="{ foods: initVals }"
      disable-submit-btn
      p="0!"
    >
      <FieldArray name="foods" v-slot="{ fields, push, remove }">
        <div
          v-for="(field, idx) in fields as FieldEntry<Food>[]"
          :key="field.key"
          w-full
          flex
          flex-row
          items-center
          gap-x-0.5rem
        >
          <SInput :name="`foods[${idx}].name`" :label="$t('admin.nutrition.name')" w-full />
          <SBtn @click="field.value.id ? onremove(idx) : remove(idx)" :icon="symRoundedDelete" bg="bg!" />
        </div>

        <SListControls disabled-remove :disabled-submit="disableSubmitBtn" @add="push({ name: '' })" mt-0.5rem />
        <SConfirmDialog
          v-model="isConfirmDialogShown"
          @confirm="
            () => {
              const _fields = fields as FieldEntry<Food>[];
              if (removeItemIndex === undefined) {
                console.error('removeItemIndex should not be undefined');
                return;
              }

              // Order is important! If 'remove' stays before 'deleteFood', it will delete the wrong item
              useLoadingAction(foodList.deleteState, () => deleteFood({ id: _fields[removeItemIndex!].value.id }));
              remove(removeItemIndex);
            }
          "
          type="deletion"
        />
      </FieldArray>
    </SForm>
  </div>
</template>
