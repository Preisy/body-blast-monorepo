<script setup lang="ts">
import { FNutritionListForm } from 'features/FNutritionListForm';
import { Nutrition } from 'shared/api/nutrition';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNutritionLongProps {
  nutrition: Nutrition;
}
const props = defineProps<WAdminNutritionLongProps>();
const mealItems = computed(() => props.nutrition.mealItems || []);
const categories = [1, 2, 3] as const;
</script>

<template>
  <SComponentWrapper h-full>
    <h1 mb-1rem>{{ nutrition.name }}</h1>

    <FNutritionListForm
      v-for="category in categories"
      :key="category"
      :category="category"
      :title="nutrition.name"
      :init-values="mealItems.filter((item) => item.category === category)"
      mb-0.5rem
    />
  </SComponentWrapper>
</template>
