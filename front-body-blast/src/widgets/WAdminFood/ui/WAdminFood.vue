<script setup lang="ts">
import { FFoodListForm } from 'features/FNutritionListForm';
import { Food } from 'shared/api/food';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminFoodProps {
  title: string;
  foodItems: Array<Food>;
}

const props = defineProps<WAdminFoodProps>();

const foodItemsOrEmpty = computed(() => props.foodItems);
const categories = [1, 2, 3] as const;
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ title }}</h1>

    <template v-for="category in categories" :key="category">
      <FFoodListForm
        :category="category"
        :init-values="foodItemsOrEmpty.filter((food) => food.category === category)"
        mb-1.5rem
      />
    </template>
  </SComponentWrapper>
</template>
