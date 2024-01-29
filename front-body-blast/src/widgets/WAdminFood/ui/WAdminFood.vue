<script setup lang="ts">
export interface WAdminFoodProps {
  title: string;
}
defineProps<WAdminFoodProps>();
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ title }}</h1>

    <!-- <SSplide :options="{}">
      <SSplideSlide v-for="(slide, i) of nutritionSlides" :key="slide.type">
        <FNutritionListForm :title="slide.type" :model-value="nutritionSlides[i].items" />
      </SSplideSlide>
    </SSplide> -->
  </SComponentWrapper>
</template>
