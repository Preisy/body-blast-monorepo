<script setup lang="ts">
import { groupBy } from 'lodash';
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

    <FFoodListForm :type="type" :init-values="groupBy(foodItemsOrEmpty, ({ category }) => category)" mb-1.5rem />
  </SComponentWrapper>
</template>
