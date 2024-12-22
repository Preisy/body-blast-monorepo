<script setup lang="ts">
import { QScrollArea } from 'quasar';

export interface SProxyScroll {
  type?: 'vertical' | 'horizontal';
}
defineProps<SProxyScroll>();

const scrollArea = ref<InstanceType<typeof QScrollArea>>();

const thumbStyle: Partial<CSSStyleDeclaration> = {
  borderRadius: '5px',
  backgroundColor: 'var(--q-primary-50-solid)',
  right: '2px',
  bottom: '2px',
  width: '5px',
  height: '5px',
  opacity: '0.75',
  zIndex: '99999',
};

defineExpose({
  setScrollPosition: (axis: 'horizontal' | 'vertical', offset: number, duration?: number) =>
    scrollArea.value?.setScrollPosition(axis, offset, duration),
});
</script>

<template>
  <q-scroll-area
    ref="scrollArea"
    v-if="!$q.platform.is.mac || !$q.platform.is.ios || !$q.platform.is.iphone || !$q.platform.is.safari"
    v-bind="$props"
    :thumb-style="thumbStyle"
    :horizontal-thumb-style="thumbStyle"
    :style="{ contain: 'unset' }"
    h-full
  >
    <slot />
  </q-scroll-area>
  <div overflow-y-scroll v-else>
    <slot />
  </div>
</template>
