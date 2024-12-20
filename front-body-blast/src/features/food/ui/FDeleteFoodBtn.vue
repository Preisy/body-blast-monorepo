<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { Food, useAdminFoodStore } from 'entities/food';
import { SBtn, SConfirmDialog } from 'shared/ui';

export interface Props {
  foodType: Food['type'];
}
const props = defineProps<Props>();

const foodStore = useAdminFoodStore();
const foodList = computed(() => foodStore.foodList.data?.data);

const emit = defineEmits<{
  click: [];
}>();

const showDialog = ref<boolean>(false);

const deleteFood = async () => {
  if (!foodList.value) return;
  foodStore.deleteFoodByType({ type: props.foodType });

  emit('click');
};
</script>

<template>
  <SBtn
    @click="showDialog = true"
    :icon="symRoundedDelete"
    :loading="foodStore.foodList.deleteState.isLoading()"
    v-bind="{ ...$attrs }"
  />
  <SConfirmDialog v-model="showDialog" type="deletion" @confirm="deleteFood" />
</template>
