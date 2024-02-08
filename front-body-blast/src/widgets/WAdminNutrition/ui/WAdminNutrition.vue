<script setup lang="ts">
import { FNutritionListForm } from 'features/FNutritionListForm';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNutritionLongProps {
  nutrition: Nutrition;
}
defineProps<WAdminNutritionLongProps>();
</script>

<template>
  <SComponentWrapper h-full>
    <h1 mb-1rem>{{ title }}</h1>

    <FNutritionListForm :category="1" :title="slide.type" :init-values="getNutritions" />
    <FNutritionListForm :category="2" :title="slide.type" :init-values="getNutritions" />
    <FNutritionListForm :category="3" :title="slide.type" :init-values="getNutritions" />
  </SComponentWrapper>
</template>
