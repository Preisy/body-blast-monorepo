<script setup lang="ts">
import { QScrollArea } from 'quasar';

const thumbStyle = {
  borderRadius: '5px',
  backgroundColor: 'var(--q-secondary)',
  right: '-2px',
  bottom: '-2px',
  width: '5px',
  height: '5px',
  opacity: '0.75',
};
</script>

<template>
  <q-scroll-area :thumb-style="thumbStyle" :horizontal-thumb-style="thumbStyle" :style="{ contain: 'unset' }" h-full>
    <slot />
  </q-scroll-area>
</template>
