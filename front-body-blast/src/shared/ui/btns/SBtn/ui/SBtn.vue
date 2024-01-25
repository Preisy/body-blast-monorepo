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
  <q-btn ref="btn" v-bind="$props" ripple flat rounded-1rem bg-secondary p-1rem text-0 text-primary boxshadow-btn>
    <slot />
  </q-btn>
</template>
