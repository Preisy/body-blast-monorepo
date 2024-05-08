<script setup lang="ts">
import { Nutrition } from 'shared/api';
import { Food } from 'shared/api/food';
import { tod } from 'shared/lib';
import { SInput } from 'shared/ui';

export interface ENutritionItemProps {
  name: Nutrition['name'];
  mealItems: NonNullable<Nutrition['mealItems']>;
}
const props = defineProps<ENutritionItemProps>();
const categories: XOR<Nutrition.Item, Food>[][] = [[], [], []]
  .map((it, ind) => props.mealItems.filter((it) => it.category == ind + 1))
  .filter((it) => it.length);
const colorsBg = ['accent', 'primary', 'secondary'];
const colorsText = ['positive', 'positive', 'primary'];
</script>

<template>
  <div mx-6>
    <h1 pt-3>{{ tod(`home.nutrition.${name}`) }}</h1>
    <div grid grid-cols-2 my-4 gap-2 v-for="(category, ind) in categories" :key="ind">
      <SInput
        v-for="item in category"
        :model-value="item.quantity || item.name"
        :key="item.id"
        :name="item.name || item.type"
        :label="item.quantity ? item.type : `${$t(`home.nutrition.category`)} ${item.category}`"
        readonly
        centered
        :color="colorsText[item.category - 1]"
        :bg-color="colorsBg[item.category - 1]"
        :active-color="colorsText[item.category - 1]"
        :active-bg-color="colorsBg[item.category - 1]"
        class="pointer-events-none select-none [&_.text-base]:font-bold!"
      />
    </div>
  </div>
</template>
