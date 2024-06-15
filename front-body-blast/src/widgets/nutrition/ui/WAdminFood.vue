<script setup lang="ts">
import { FDeleteFoodBtn } from 'features/food';
import { FFoodListForm } from 'features/nutrition';
import { Food } from 'entities/food';
import { SComponentWrapper } from 'shared/ui';

export interface WAdminFoodProps {
  type: string;
  foodItems: Array<Food>;
}

const props = defineProps<WAdminFoodProps>();

const foodItemsOrEmpty = computed(() => props.foodItems);
const categories = [1, 2, 3] as const;

defineEmits<{
  deleted: [];
}>();
</script>

<template>
  <SComponentWrapper>
    <div mb-1rem flex flex-row>
      <h1>{{ type }}</h1>
      <FDeleteFoodBtn :food-type="type" ml-auto @click="$emit('deleted')" />
    </div>

    <FFoodListForm
      v-for="category in categories"
      :key="category"
      :category="category"
      :type="type"
      :init-values="foodItemsOrEmpty.filter((food) => food.category === category)"
      mb-1.5rem
    />
  </SComponentWrapper>
</template>
