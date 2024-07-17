<script setup lang="ts">
import { QFileProps, QFile } from 'quasar';
import { useField } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { Notify } from 'shared/lib';

export interface SFilePickerProps extends Omit<QFileProps, 'modelValue'> {
  name: string;
  labelNoWrap?: boolean;
}
const props = defineProps<SFilePickerProps>();
defineEmits<{
  'update:model-value': [file: File | FileList | undefined];
}>();

const { t } = useI18n();

const { value, errorMessage } = useField<File>(() => props.name);
const onRejected = (rejectedEntries: { failedPropValidation: string; file: File }[]) => {
  if (rejectedEntries[0].failedPropValidation == 'max-file-size') {
    Notify.simpleError(t('global.errors.maxFileSize', { size: '15' }));
  }
};
</script>

<template>
  <div class="s-file-picker">
    <QFile
      v-bind="$props"
      v-model="value"
      :display-value="value ? value.name : displayValue"
      :bg-color="value === undefined && displayValue === undefined ? 'primary-50-solid' : 'primary'"
      label-color="bg"
      standout
      :ripple="{ color: 'red' }"
      hide-bottom-space
      :error="!!errorMessage"
      :max-file-size="1024 * 1024 * 15"
      bottom-slots
      class="h-min overflow-hidden! [&]:rounded-1rem [&_.q-field\_\_label]:text-bg [&_.q-field\_\_native]:text-bg"
      :class="{ 'whitespace-nowrap': labelNoWrap }"
      @rejected="onRejected"
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
