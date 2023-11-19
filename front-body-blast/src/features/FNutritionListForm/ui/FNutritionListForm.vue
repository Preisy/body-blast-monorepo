<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
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

const schema = toTypedSchema(
  z.object({
    type: z.string(),
    value: z.string(),
  }),
);
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <div flex gap-x-5px>
      <p />
      <p>{{ title }}</p>
    </div>

    <SForm @submit="onadd" :field-schema="schema">
      <div flex gap-x-0.5rem>
        <SInput name="type" label="Тип" />
        <SInput name="value" label="Количество" />
      </div>

      <template #submit-btn>
        <SListControls disabled-add @remove="onremove" />
      </template>
    </SForm>

    <SRemoveDialog ref="dialog" @apply="onRemoveApply" />
  </div>
</template>
