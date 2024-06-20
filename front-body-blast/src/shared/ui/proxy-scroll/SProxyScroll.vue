<script setup lang="ts">
export interface SProxyScroll {
  type?: 'vertical' | 'horizontal';
}
defineProps<SProxyScroll>();

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
</script>

<template>
  {{ console.log($q.platform) }}
  <q-scroll-area
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
