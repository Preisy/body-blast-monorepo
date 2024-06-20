<script setup lang="ts">
type cat = 1 | 2 | 3;
export interface NutritionListHeaderProps {
  category: cat;
}
defineProps<NutritionListHeaderProps>();
const categoryColorMap: Record<cat, string> = {
  1: 'bg-accent',
  2: 'bg-primary',
  3: 'bg-secondary',
};
</script>

<template>
  <div flex gap-x-5px>
    <p h-16px w-16px rounded="100%" :class="categoryColorMap[category]" />
    <p>{{ $t('admin.nutrition.category') }} {{ category }}</p>
  </div>
</template>
