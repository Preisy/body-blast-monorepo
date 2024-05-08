<script setup lang="ts">
import { ENutritionItem } from 'entities/nutrition';
import { Nutrition } from 'shared/api';
import { SComponentWrapper, SNoResultsScreen, SSplide, SSplideSlide, SStructure } from 'shared/ui';

export interface ENutritionListProps {
  nutritions: Array<Nutrition>;
}
defineProps<ENutritionListProps>();
</script>

<template>
  <SStructure relative>
    <SComponentWrapper>
      <SSplide
        :options="{
          direction: 'ttb',
          height: '15rem',
          fixedHeight: 'auto',
          arrows: false,
          omitEnd: true,
          gap: '2rem',
        }"
        class="[&_.splide\_\_pagination]:right--1.25rem"
      >
        <template v-if="nutritions.length">
          <SSplideSlide v-for="(nutrition, index) in nutritions" :key="index">
            <ENutritionItem
              v-if="nutrition.mealItems"
              :name="nutrition.name"
              :meal-items="nutrition.mealItems"
              class="mx-0!"
            />
          </SSplideSlide>
        </template>
        <SSplideSlide v-else>
          <SNoResultsScreen />
        </SSplideSlide>
      </SSplide>
    </SComponentWrapper>
  </SStructure>
</template>
