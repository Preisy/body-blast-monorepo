<script setup lang="ts">
import { QScrollArea } from 'quasar';
</script>

<template>
  <q-scroll-area
    :thumb-style="{
      borderRadius: '5px',
      backgroundColor: 'var(--q-secondary)',
      right: '-2px',
      width: '5px',
      opacity: '0.75',
    }"
    :style="{ contain: 'unset' }"
    h-full
  >
    <slot />
  </q-scroll-area>
</template>
