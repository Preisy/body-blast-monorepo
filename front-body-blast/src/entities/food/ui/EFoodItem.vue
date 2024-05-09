<script setup lang="ts">
import { tod } from 'shared/lib';
import { SInput } from 'shared/ui';
import { Food } from '..';

export interface Props {
  type: Food['type'];
  items: Array<Food>;
}
const props = defineProps<Props>();
const categories: Food[][] = [[], [], []]
  .map((_, ind) => props.items.filter((it) => it.category == ind + 1))
  .filter((it) => it.length);
const colorsBg = ['accent', 'primary', 'secondary'];
const colorsText = ['positive', 'positive', 'primary'];
</script>

<template>
  <div mx-6>
    <h1 pt-3>{{ tod(`home.nutrition.${type}`) }}</h1>
    <div grid grid-cols-2 my-4 gap-2 v-for="(category, ind) in categories" :key="ind">
      <SInput
        v-for="item in category"
        :model-value="item.name"
        :key="item.id"
        :name="item.type"
        :label="`${$t(`home.nutrition.category`)} ${item.category}`"
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
