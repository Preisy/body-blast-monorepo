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
  <div
    bg="primary/50"
    class="s-select [&_.q-field\_\_label]:(top-0 text-bg) [&.centered_.q-field--dense.q-field--float_.q-field\_\_label]:(left-1/2 scale-3/4 -translate-x-[37.5%] -translate-y-1/3) [&.centered_.q-field\_\_label]:(left-1/2 -translate-x-2/4) [&_.q-field\_\_bottom]:display-none [&_.q-field\_\_control]:(h-auto px-1.25rem py-1rem transition-all-300) [&_.q-field--highlighted_.q-field\_\_control]:(bg-primary) [&.not\_empty]:(bg-primary) [&_.q-placeholder]:p-0 [&_.q-field]:pb-0 [&.error_.q-field\_\_control]:pb-2rem [&.centered_.q-field\_\_native]:(text-center) [&_input]:(p-0! text-base! text-bg!) [&_.q-field--highlighted_.q-placeholder]:pt-0.5rem! [&.not\_empty_.q-placeholder]:pt-0.5rem! [&_.q-field\_\_native_span]:(text-base!)"
    relative
    overflow-hidden
    rounded-1rem
    transition-all-300
    :class="{ not_empty: value !== undefined, error: !!errorMessage, centered }"
  >
    <q-select
      v-bind="$props"
      v-model="value"
      behavior="menu"
      label-color="bg"
      popup-content-class="bg-primary text-bg rounded-1rem [&_span]:text-base!"
      standout
      dense
      emit-value
      map-options
      text-bg
      transition-all-300
    />
  </div>
</template>
