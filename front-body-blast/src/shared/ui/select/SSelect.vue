<script setup lang="ts">
import { QSelect, QSelectProps } from 'quasar';
import { useField } from 'vee-validate';
export interface SInputProps extends Omit<QSelectProps, 'modelValue' | 'name' | 'placeholder'> {
  placeholder?: string;
  name: string;
  autocomplete?: string;
  centered?: boolean;
  modelValue?: QSelectProps['modelValue'];
}
const props = defineProps<SInputProps>();

const { value, errorMessage, setValue } = useField<string | number | undefined>(() => props.name);
if (props.readonly && props.modelValue) setValue(props.modelValue);
</script>

<template>
  <q-select
    v-bind="$props"
    v-model="value"
    behavior="menu"
    label-color="bg"
    popup-content-class="bg-primary text-bg rounded-1rem [&_span]:text-base! [&_.q-item--active]:(text-secondary/70 bg-primary/80)"
    standout
    dense
    emit-value
    map-options
    class="s-select"
    :class="{ not_empty: value !== undefined, error: !!errorMessage, centered }"
  />
</template>

<style scoped lang="scss">
.s-select {
  --uno: pb-0 overflow-hidden rounded-1rem transition-all-300 bg-primary/50;
  color: theme('colors.bg');

  :focus {
    --uno: border border-(solid secondary) border-b-1px;
  }

  // hide error message
  ::v-deep(.q-field__bottom) {
    display: none;
  }

  // wrapper
  ::v-deep(.q-field__control) {
    --uno: px-1.25rem py-0.75rem;
    color: theme('colors.bg');
  }

  // .q-field__native span == current option text
  ::v-deep(.q-field__native span) {
    color: theme('colors.bg');
    --uno: text-base;
  }

  // .q-field__label == floating text
  ::v-deep(.q-field__label) {
    font-size: inherit;
  }

  // Dropdown icon (little triangle)
  ::v-deep(.q-field__marginal) {
    color: inherit;
  }

  // if contains value - set background color to primary(black)
  &.not_empty {
    --uno: bg-primary;
  }
}
</style>
