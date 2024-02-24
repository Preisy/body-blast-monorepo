<script lang="ts" setup>
import { SCenteredByChild } from 'shared/ui/SCenteredByChild';

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
      nowrap
      font-semibold
      :key="page.value"
      :data-key="page.value"
      ref="listElements"
      @click="setPage(page.value)"
      :class="{ 'opacity-50': modelValue !== page.value }"
    >
      {{ page.label }}
    </a>
  </SCenteredByChild>
</template>
