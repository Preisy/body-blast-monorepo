<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { uniqueId } from 'lodash';
import { z } from 'zod';
import { SListControls } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';
import { SRemoveDialog } from 'shared/ui/SRemoveDialog';
import NutritionListHeader from './NutritionListHeader.vue';

export interface FNutritionListFormProps {
  title: string;
  category: 1 | 2 | 3;
  initValues: Array<Item>;
}
interface Item {
  type: string;
  value: string;
}

const props = defineProps<FNutritionListFormProps>();
const emit = defineEmits<{
  submit: [Array<Item>];
}>();

const lines = ref<Array<Partial<Item & { uniqueId: string }>>>(
  props.initValues.map((el) => ({ ...el, uniqueId: uniqueId('line-') })),
);

const dialog = ref<InstanceType<typeof SRemoveDialog>>();
const removeItemIndex = ref<number>();
const onRemoveApply = () => {
  if (removeItemIndex.value === undefined || removeItemIndex.value === null) return;
  lines.value.splice(removeItemIndex.value, 1);
  console.log(removeItemIndex.value);
  console.log('aboba');
};

const onremove = (index: number) => {
  dialog.value?.show();
  removeItemIndex.value = index;
};
const onadd = () => {
  lines.value.push({ uniqueId: uniqueId('line-') });
};
const onsubmit = (values: Array<Item>) => {
  emit('submit', values);
};

const schema = computed(() =>
  toTypedSchema(
    z.object({
      type: z.string(),
      value: z.string(),
    }),
  ),
);
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <NutritionListHeader :category="category" :title="title" />

    <SForm
      v-for="(line, index) of lines"
      :key="line.uniqueId"
      @submit="onsubmit"
      :field-schema="schema"
      :init-values="line"
      p="0!"
    >
      <div flex gap-x-0.5rem>
        <!-- TODO: I18n -->
        <SInput name="type" label="Тип" />
        <SInput name="value" label="Количество" />
      </div>

      <template #submit-btn>
        <SListControls
          :disabled-add="index !== lines.length - 1"
          :disabled-submit="index !== lines.length - 1"
          @remove="() => onremove(index)"
          @add="onadd"
          mt-0.5rem
        />
      </template>
    </SForm>

    <SRemoveDialog ref="dialog" @apply="onRemoveApply" />
  </div>
</template>
