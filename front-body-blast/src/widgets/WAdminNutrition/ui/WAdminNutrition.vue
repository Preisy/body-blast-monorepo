<script setup lang="ts">
import { FNutritionListForm, FNutritionListFormProps } from 'features/FNutritionListForm';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';

export interface WAdminNutritionLongProps {
  title: string;
}
defineProps<WAdminNutritionLongProps>();

const nutritionSlides = ref<
  Array<{
    type: string;
    items: FNutritionListFormProps['modelValue'];
  }>
>([
  {
    type: 'Завтрак',
    items: [{ type: 'Греча', value: '100 гр' }],
  },
  {
    type: 'Перекус',
    items: [{ type: 'Греча', value: '100 гр' }],
  },
]);
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ title }}</h1>

    <SSplide :options="{ direction: 'ttb' }">
      <SSplideSlide v-for="(slide, i) of nutritionSlides" :key="slide.type">
        <FNutritionListForm :title="slide.type" :model-value="nutritionSlides[i].items" />
      </SSplideSlide>
    </SSplide>
  </SComponentWrapper>
</template>
