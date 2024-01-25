<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';
import { useField } from 'vee-validate';
import ErrorMsg from './ErrorMsg.vue';
export interface SInputProps extends Omit<QInputProps, 'modelValue' | 'name' | 'placeholder'> {
  placeholder?: string;
  name: string;
  autocomplete?: string;
  centered?: boolean;
  modelValue?: QInputProps['modelValue'];
  readonly?: boolean;
}
const props = defineProps<SInputProps>();
const wrapper = ref<HTMLElement>();

const { value, errorMessage, setValue } = useField<string | number | undefined>(() => props.name);
if (props.readonly && props.modelValue) setValue(props.modelValue);
watch(
  () => props.modelValue,
  (next) => setValue(next ?? undefined),
  { immediate: true },
);
</script>

<template>
  <div
    ref="wrapper"
    bg="primary/50"
    class="s-input [&_.q-field\_\_label]:(top-0 text-bg) [&.centered_.q-field--dense.q-field--float_.q-field\_\_label]:(left-1/2 scale-3/4 -translate-x-[37.5%] -translate-y-1/3) [&.centered_.q-field\_\_label]:(left-1/2 -translate-x-2/4) [&_.q-field\_\_bottom]:display-none [&_.q-field\_\_control]:(h-auto px-1.25rem py-1rem transition-all-300) [&_.q-field--highlighted_.q-field\_\_control]:(bg-primary) [&.not\_empty]:(bg-primary) [&_.q-placeholder]:p-0 [&_.q-field]:pb-0 [&.error_.q-field\_\_control]:pb-2rem [&.centered_.q-field\_\_native]:(text-center) [&_input]:(p-0! text-base! text-bg!) [&_.q-field--highlighted_.q-placeholder]:pt-0.5rem! [&.not\_empty_.q-placeholder]:pt-0.5rem!"
    relative
    overflow-hidden
    rounded-1rem
    transition-all-300
    :class="{ not_empty: !!value, error: !!errorMessage, centered }"
  >
    <q-input
      v-bind="$props"
      v-model="value"
      label-color="bg"
      :input-class="`text-base p-0! ${$props.inputClass}`"
      :bottom-slots="false"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      standout
      dense
      text-bg
      transition-all-300
      aria-autocomplete="both"
    />
    <ErrorMsg absolute bottom-1rem left-1.25rem z-1 v-if="!!errorMessage" :msg="errorMessage" />
  </div>
</template>
