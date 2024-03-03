<script setup lang="ts">
import { EDietItem } from 'entities/diet/EDietItem';
import { Nutrition } from 'shared/api/nutrition';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

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
      >
        <SSplideSlide v-for="(nutrition, index) in nutritions" :key="index">
          <EDietItem
            v-if="nutrition.mealItems"
            :name="nutrition.name"
            :meal-items="nutrition.mealItems"
            class="mx-0!"
          />
          <SNoResultsScreen v-else p-1.5rem />
        </SSplideSlide>
      </SSplide>
    </SComponentWrapper>
  </SStructure>
</template>
