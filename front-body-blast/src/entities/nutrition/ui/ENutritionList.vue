<script setup lang="ts">
import { ENutritionItem } from 'entities/nutrition';
import { Nutrition } from 'shared/api';
import { SComponentWrapper } from 'shared/ui/component-wrapper';
import { SNoResultsScreen } from 'shared/ui/no-results-screen';
import { SSplide } from 'shared/ui/splide';
import { SSplideSlide } from 'shared/ui/splide-slide';
import { SStructure } from 'shared/ui/structure';

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
