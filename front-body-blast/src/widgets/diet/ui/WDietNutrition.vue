<script setup lang="ts">
import { EDietItem } from 'entities/diet';
import { Nutrition } from 'shared/api/nutrition';
import { SComponentWrapper } from 'shared/ui/component-wrapper';
import { SNoResultsScreen } from 'shared/ui/no-results-screen';
import { SSplide } from 'shared/ui/splide';
import { SSplideSlide } from 'shared/ui/splide-slide';
import { SStructure } from 'shared/ui/structure';

export interface WDietNutritionProps {
  nutritions: Array<Nutrition>;
}
defineProps<WDietNutritionProps>();
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
            <EDietItem
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
