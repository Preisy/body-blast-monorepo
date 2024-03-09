<script setup lang="ts">
import { QBtn, QBtnProps } from 'quasar';

export interface SBtnProps extends QBtnProps {}
defineProps<SBtnProps>();

const btn = ref<InstanceType<typeof QBtn>>();
defineExpose({
  click: () => btn.value?.click(),
});
</script>

<template>
  <q-btn
    v-bind="$props"
    ref="btn"
    ripple
    flat
    h-min
    rounded-0.75rem
    bg-secondary
    p-0.75rem
    text-0
    text-primary
    boxshadow-btn
    class="[&_.q-icon]:text-24px"
  >
    <slot />
  </q-btn>
</template>
