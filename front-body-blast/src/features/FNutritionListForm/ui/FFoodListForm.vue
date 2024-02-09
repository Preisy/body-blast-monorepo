<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { uniqueId } from 'lodash';
import { Food } from 'shared/api/food';
import { SListControls } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';
import { SRemoveDialog } from 'shared/ui/SRemoveDialog';
import NutritionListHeader, { NutritionListHeaderProps } from './NutritionListHeader.vue';

export interface FFoodListFormProps {
  category: NutritionListHeaderProps['category'];
  initValues: Array<Food>;
}

const props = defineProps<FFoodListFormProps>();
const emit = defineEmits<{
  submit: [Array<Food>];
}>();

const lines = ref<Array<Partial<Food & { uniqueId: string }>>>(
  props.initValues.map((el) => ({ ...el, uniqueId: uniqueId('line-') })),
);
const linesVisible = computed(() => {
  const result = [...lines.value];
  if (!result.length) result.push({ uniqueId: uniqueId('line-') });
  return result;
});

const dialog = ref<InstanceType<typeof SRemoveDialog>>();
const removeItemIndex = ref<number>();
const onRemoveApply = () => {
  if (removeItemIndex.value === undefined || removeItemIndex.value === null) return;
  lines.value.splice(removeItemIndex.value, 1);
  console.log(removeItemIndex.value);
};

const onremove = (index: number) => {
  dialog.value?.show();
  removeItemIndex.value = index;
};
const onadd = () => {
  lines.value.push({ uniqueId: uniqueId('line-') });
};
const onsubmit = (values: Array<Food>) => {
  emit('submit', values);
};

const validationSchema = toTypedSchema(Food.validation().pick({ name: true }));
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <NutritionListHeader :category="category" />

    <SForm
      v-for="(line, index) of linesVisible"
      :key="line.uniqueId"
      @submit="onsubmit"
      :field-schema="validationSchema"
      :init-values="line"
      p="0!"
    >
      <div>
        <SInput name="name" :label="$t('admin.nutrition.type')" />
      </div>

      <template #submit-btn>
        <SListControls
          :disabled-add="index !== linesVisible.length - 1"
          :disabled-submit="index !== linesVisible.length - 1"
          :disabled-remove="!(linesVisible.length - 1)"
          @remove="() => onremove(index)"
          @add="onadd"
          mt-0.5rem
        />
      </template>
    </SForm>

    <SRemoveDialog ref="dialog" @apply="onRemoveApply" />
  </div>
</template>
