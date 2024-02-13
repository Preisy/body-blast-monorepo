<script setup lang="ts">
import { FFoodListForm } from 'features/FNutritionListForm';
import { useAdminFoodStore } from 'shared/api/admin';
import { Food } from 'shared/api/food';
import { useLoadingAction } from 'shared/lib/loading';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNewFoodProps {
  userId: number;
}
defineProps<WAdminNewFoodProps>();

const { postFood, postFoodResponse } = useAdminFoodStore();

const categories = [1, 2, 3] as const;
const type = ref();
const onCreate = (food: Pick<Food, 'name' | 'category'>) => {
  useLoadingAction(postFoodResponse, () => postFood({ ...food, type: type.value }));
};
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_food_title') }}</h1>

    <SInput v-model="type" name="type" :label="$t('admin.nutrition.type')" mb-1rem mt-0.5rem />

    <template v-for="category in categories" :key="category">
      <FFoodListForm :category="category" @create="onCreate" mb-1.5rem />
    </template>
  </SComponentWrapper>
</template>
