<script setup lang="ts">
import { FNutritionListForm, FNutritionListFormProps } from 'features/FNutritionListForm';

export interface WAdminNutritionLongProps {
  title: string;
}
defineProps<WAdminNutritionLongProps>();

interface NutritionSlide {
  type: string;
  items: Ref<Array<FNutritionListFormProps['modelValue']>>;
}

const nutritions: Array<NutritionSlide> = [
  {
    type: 'Завтрак',
    items: ref([{ type: 'Греча', value: '100 гр' }]),
  },
];
</script>

<template>
  <SComponentWrapper>
    <h1>{{ title }}</h1>

    <FNutritionListForm :model-value="" />
  </SComponentWrapper>
</template>
