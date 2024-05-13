<script setup lang="ts">
import { Food, useAdminFoodStore } from 'entities/food';
import { SBtn } from 'shared/ui';

export interface Props {
  foodType: Food['type'];
}
const props = defineProps<Props>();

const foodStore = useAdminFoodStore();
const foodList = computed(() => foodStore.foodList.data?.data);

const deleteFood = () => {
  //TODO: fix, when api will be ready
  foodList.value
    ?.filter((item) => item.type === props.foodType)
    .forEach((item) => foodStore.deleteFood({ id: item.id }));
};

defineEmits<{
  click: [];
}>();
</script>

<template>
  <SBtn
    @click="
      deleteFood();
      $emit('click');
    "
    icon="sym_r_delete"
    :loading="foodStore.foodList.deleteState.isLoading()"
  />
</template>
