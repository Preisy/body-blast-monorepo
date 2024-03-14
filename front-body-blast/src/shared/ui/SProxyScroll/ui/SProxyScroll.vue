<script setup lang="ts">
export interface SProxyScroll {
  type?: 'vertical' | 'horizontal';
}
defineProps<SProxyScroll>();

const thumbStyle: Partial<CSSStyleDeclaration> = {
  borderRadius: '5px',
  backgroundColor: 'var(--q-primary-50-solid)',
  right: '-2px',
  bottom: '-2px',
  width: '5px',
  height: '5px',
  opacity: '0.75',
  zIndex: '99999',
};
</script>

<template>
  <q-scroll-area
    v-bind="$props"
    :thumb-style="thumbStyle"
    :horizontal-thumb-style="thumbStyle"
    :style="{ contain: 'unset' }"
    h-full
    :content-style="{ width: type === 'vertical' ? '100%' : '' }"
    :content-active-style="{ width: type === 'vertical' ? '100%' : '' }"
  >
    <slot />
  </q-scroll-area>
</template>
