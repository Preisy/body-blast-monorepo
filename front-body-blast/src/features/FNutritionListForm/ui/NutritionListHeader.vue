<script setup lang="ts">
import { FNutritionListFormProps } from './FNutritionListForm.vue';

export interface NutritionListHeaderProps {
  category: FNutritionListFormProps['category'];
}
defineProps<NutritionListHeaderProps>();
const categoryColorMap: Record<NutritionListHeaderProps['category'], string> = {
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
