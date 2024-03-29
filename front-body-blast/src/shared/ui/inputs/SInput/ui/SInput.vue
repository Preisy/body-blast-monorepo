<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';
import { useField } from 'vee-validate';
import ErrorMsg from './ErrorMsg.vue';
export interface SInputProps extends Omit<QInputProps, 'modelValue' | 'name' | 'placeholder'> {
  placeholder?: string;
  name?: string;
  autocomplete?: string;
  centered?: boolean;
  modelValue?: QInputProps['modelValue'];
  readonly?: boolean;
  color?: string;
  activeColor?: string;
  bgColor?: string;
  activeBgColor?: string;
  watchModelValue?: boolean;
}

const props = withDefaults(defineProps<SInputProps>(), {
  autocomplete: undefined,
  placeholder: undefined,
  modelValue: undefined,
  name: undefined,
  color: 'bg',
  activeColor: 'bg',
  bgColor: 'primary-50-solid',
  activeBgColor: 'primary',
  watchModelValue: false,
});

//TODO: find a workaround for '____'. Remove it
const { value, errorMessage, setValue } = useField<string | number | undefined>(() => props.name ?? '____');
if ((props.modelValue && !props.name) || (props.modelValue && props.readonly)) setValue(props.modelValue);
if (props.watchModelValue) {
  watchEffect(() => {
    setValue(props.modelValue ?? undefined);
  });
}

const currentColor = computed(() => (!!value.value ? props.activeColor : props.color));
const currentBgColor = computed(() => (!!value.value ? props.activeBgColor : props.bgColor));
</script>

<template>
  <div
    :bg="currentBgColor"
    class="s_input text-bg [&.centered_.q-field--dense.q-field--float_.q-field\_\_label]:(left-1/2 scale-3/4 -translate-x-[37.5%] -translate-y-1/3) [&.centered_.q-field\_\_label]:(left-1/2 -translate-x-2/4) [&_.q-field\_\_control]:(h-auto px-1.25rem py-1rem transition-all-300) [&.error_.q-field\_\_control]:pb-2rem [&.centered_.q-field\_\_native]:(text-center) [&_input]:(p-0! text-base!) [&_.q-field--highlighted_.q-placeholder]:pt-0.5rem! [&.not\_empty_.q-placeholder]:pt-0.5rem!"
    :class="{ not_empty: !!value, error: !!errorMessage, centered }"
    relative
    h-fit
    overflow-hidden
    rounded-1rem
    transition-all-300
  >
    <q-input
      v-bind="$props"
      v-model="value"
      :color="currentColor"
      :bg-color="currentBgColor"
      :input-class="['text-base p-0!', inputClass]"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :bottom-slots="true"
      standout
      dense
      pointer-events-none
      transition-all-300
    />
    <ErrorMsg
      v-if="!!errorMessage"
      :msg="errorMessage"
      pointer-events-none
      absolute
      bottom-1rem
      left-1.25rem
      z-1
      select-none
    />
  </div>
</template>

<style scoped lang="scss">
.s_input {
  height: fit-content;

  &:deep(.q-field__label) {
    color: currentColor !important;
    user-select: none;
    top: 0;
  }

  &:deep(.q-field__native) {
    color: currentColor !important;
    user-select: none;
  }

  &:deep(.q-field__bottom) {
    display: none;
  }

  &:deep(.q-placeholder) {
    padding: 0;
  }
  &:deep(.q-field) {
    padding-bottom: 0;
  }
  &:deep(.q-field__control)::before {
    border: none !important;
  }
}
</style>
