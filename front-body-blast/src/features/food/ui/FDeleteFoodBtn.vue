<script setup lang="ts">
import { Food, useAdminFoodStore } from 'entities/food';
import { SBtn } from 'shared/ui';

export interface Props {
  foodType: Food['type'];
}
const props = defineProps<Props>();

const foodStore = useAdminFoodStore();
const foodList = computed(() => foodStore.foodList.data?.data);

const emit = defineEmits<{
  click: [];
}>();

const deleteFood = async () => {
  if (!foodList.value) return;
  foodStore.deleteFoodByType({ type: props.foodType });

  emit('click');
};
</script>

<template>
  <SBtn @click="deleteFood" icon="sym_r_delete" :loading="foodStore.foodList.deleteState.isLoading()" />
</template>
