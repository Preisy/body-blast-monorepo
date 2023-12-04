<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { uniqueId } from 'lodash';
import { z } from 'zod';
import { SListControls } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';
import { SRemoveDialog } from 'shared/ui/SRemoveDialog';
export interface FNutritionListFormProps {
  title: string;
  modelValue: Array<{
    type: string;
    value: string;
  }>;
}
type Item = FNutritionListFormProps['modelValue'][number];

const props = defineProps<FNutritionListFormProps>();
const emit = defineEmits<{
  'update:modelValue': [FNutritionListFormProps['modelValue']];
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const dialog = ref<InstanceType<typeof SRemoveDialog>>();
const onremove = () => {
  dialog.value?.show();
};
const onadd = (values: Item) => {
  value.value.push(values);
};
const onRemoveApply = () => {
  console.log('aboba');
};

const lines = ref<Array<Partial<{ type: string; value: string; uniqueId: string }>>>([{ uniqueId: uniqueId('line-') }]);
const schema = computed(() =>
  toTypedSchema(
    z
      .object({
        type: z.string(),
        value: z.string(),
      })
      .array(),
  ),
);
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <div flex gap-x-5px>
      <p h-6p w-6px bg-secondary />
      <p>{{ title }}</p>
    </div>

    <SForm @submit="onadd" :field-schema="schema" p="0!">
      <div flex gap-x-0.5rem v-for="line of lines" :key="line.uniqueId">
        <SInput name="type" label="Тип" />
        <SInput name="value" label="Количество" />
      </div>

      <template #submit-btn>
        <SListControls @remove="onremove" />
      </template>
    </SForm>

    <SRemoveDialog ref="dialog" @apply="onRemoveApply" />
  </div>
</template>
