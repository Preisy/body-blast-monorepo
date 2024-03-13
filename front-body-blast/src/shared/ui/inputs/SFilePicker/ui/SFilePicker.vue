<script setup lang="ts">
import { QFileProps, QFile } from 'quasar';
import { useField } from 'vee-validate';

export interface SFilePickerProps extends Omit<QFileProps, 'modelValue'> {
  name: string;
  labelNoWrap?: boolean;
}
const props = defineProps<SFilePickerProps>();
defineEmits<{
  'update:model-value': [file: File | FileList | undefined];
}>();

const { value, errorMessage } = useField<File>(() => props.name);
</script>

<template>
  <div class="s-file-picker">
    <QFile
      v-bind="$props"
      v-model="value"
      :display-value="value ? value.name : displayValue"
      :bg-color="value === undefined ? 'primary-50-solid' : 'primary'"
      label-color="bg"
      standout
      :ripple="{ color: 'red' }"
      hide-bottom-space
      :error="!!errorMessage"
      bottom-slots
      class="h-min overflow-hidden! [&]:rounded-1rem [&_.q-field\_\_label]:text-bg [&_.q-field\_\_native]:text-bg"
      :class="{ 'whitespace-nowrap': labelNoWrap }"
    >
      <template #error>
        <div absolute bottom-0.25rem text-secondary>
          <q-icon name="sym_r_error" mr-0.25rem />
          <span>
            {{ errorMessage }}
          </span>
        </div>
      </template>
    </QFile>
  </div>
</template>

<style scoped lang="scss">
.s-file-picker {
  &:deep(.q-field__append i.q-icon) {
    display: none;
  }
  &:deep(.q-field__bottom) {
    padding-top: 0;
    min-height: unset;
  }
}
</style>
