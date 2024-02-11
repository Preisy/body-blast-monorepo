<script setup lang="ts">
import { FFoodListForm } from 'features/FNutritionListForm';
import { useAdminFoodStore } from 'shared/api/admin';
import { Food } from 'shared/api/food';
import { useLoadingAction } from 'shared/lib/loading';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminFoodProps {
  type: string;
  foodItems: Array<Food>;
}

const props = defineProps<WAdminFoodProps>();
const { deleteFood, deleteFoodResponse, postFood, postFoodResponse, patchFood, patchFoodResponse } =
  useAdminFoodStore();

const foodItemsOrEmpty = computed(() => props.foodItems);
const categories = [1, 2, 3] as const;

const onRemove = (id: number) => {
  useLoadingAction(deleteFoodResponse, () => deleteFood({ id }));
};
const onCreate = (food: Pick<Food, 'name' | 'category'>) => {
  useLoadingAction(postFoodResponse, () => postFood({ ...food, type: props.type }));
};
const onEdit = (food: Pick<Food, 'id' | 'name'>) => {
  useLoadingAction(patchFoodResponse, () => patchFood(food));
};
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ type }}</h1>

    <template v-for="category in categories" :key="category">
      <FFoodListForm
        :category="category"
        :init-values="foodItemsOrEmpty.filter((food) => food.category === category)"
        @remove="onRemove"
        @create="onCreate"
        @edit="onEdit"
        mb-1.5rem
      />
    </template>
  </SComponentWrapper>
</template>
