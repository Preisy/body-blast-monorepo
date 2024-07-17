<!--
  Forbidden to place inside SProxyScroll/QScrollArea
-->
<script lang="ts" setup>
import { SCenteredByChild } from 'shared/ui';

export interface SCenteredNavProps {
  pages: { value: string; label: string }[];
  modelValue: string;
}
defineProps<SCenteredNavProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void;
}>();
const setPage = (p: string) => emit('update:modelValue', p);
</script>

<template>
  <SCenteredByChild :gap="2" :model-value="modelValue">
    <a
      v-for="page in pages"
      :key="page.value"
      @click="setPage(page.value)"
      :class="{ 'opacity-50': modelValue !== page.value }"
      :data-key="page.value"
      cursor-pointer
      whitespace-nowrap
      py-0.75rem
      text-center
      font-semibold
    >
      {{ page.label }}
    </a>
  </SCenteredByChild>
</template>
