<script setup lang="ts">
import { QScrollArea, QScrollAreaProps } from 'quasar';

export interface SProxyScroll extends QScrollAreaProps {}
defineProps<SProxyScroll>();

const thumbStyle: Partial<CSSStyleDeclaration> = {
  borderRadius: '5px',
  backgroundColor: 'var(--q-secondary)',
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
  >
    <slot />
  </q-scroll-area>
</template>
