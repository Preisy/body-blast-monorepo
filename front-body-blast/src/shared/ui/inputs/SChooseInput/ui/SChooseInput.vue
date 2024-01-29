<script setup lang="ts">
import { useFloating } from '@floating-ui/vue';
import { useField } from 'vee-validate';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SInput, SInputProps } from '../..';

export interface SChooseInputProps extends SInputProps {
  display: SInputProps['modelValue'];
}
const props = defineProps<SChooseInputProps>();
const emit = defineEmits<{
  input: [SInputProps['modelValue']];
}>();
defineExpose({
  input: (val?: SInputProps['modelValue']) => emit('input', val ?? props.modelValue),
});

const anchor = ref();
const float = ref();
const content = ref<HTMLElement>();
const contentHeight = computed(() => content.value?.getBoundingClientRect().height + 'px');

const { floatingStyles } = useFloating(anchor, float, {
  placement: 'top-start',
});
const isOpen = ref(false);
const togglePopup = () => (isOpen.value = !isOpen.value);

const { value, setValue } = useField<SInputProps['modelValue']>(props.name);
watch(
  () => props.modelValue,
  () => {
    setValue(props.modelValue);
    emit('input', value.value);
  },
);
</script>

<template>
  <div class="s-choose-input" relative w-full>
    <SProxyScroll
      @click="isOpen = false"
      v-if="isOpen"
      class="popup"
      ref="float"
      :style="{ ...floatingStyles, height: contentHeight }"
      right-0
      z-1
      overflow-hidden
      rounded-0.75rem
      bg-primary
    >
      <div ref="content" flex rounded-0.75rem>
        <slot />
      </div>
    </SProxyScroll>
    <div @click="togglePopup">
      <!-- TODO: FIXME:  ___ means private field -->
      <SInput name="_______________" :label="label" ref="anchor" readonly :model-value="display" />
    </div>
  </div>
</template>
