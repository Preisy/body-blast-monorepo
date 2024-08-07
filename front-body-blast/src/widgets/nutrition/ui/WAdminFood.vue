<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { FDeleteFoodBtn } from 'features/food';
import { FFoodListForm } from 'features/nutrition';
import { Food, useAdminFoodStore } from 'entities/food';
import { AppBaseEntity } from 'shared/api';
import { useLoadingAction, Notify } from 'shared/lib';
import { SBtn, SComponentWrapper } from 'shared/ui';

export interface WAdminFoodProps {
  type: string;
  foodItems: Array<Food>;
}

const props = defineProps<WAdminFoodProps>();
const { deleteFood, postFood, patchFood, foodList } = useAdminFoodStore();

const foodItemsOrEmpty = computed(() => props.foodItems);
const categories = [1, 2, 3] as const;

const onRemove = (id: AppBaseEntity['id']) => {
  useLoadingAction(foodList.deleteState, () => deleteFood({ id }));
};
const onCreate = (food: Pick<Food, 'name' | 'category'>) => {
  useLoadingAction(foodList.createState, () => postFood({ ...food, type: props.type }));
};
const onEdit = (food: Pick<Food, 'id' | 'name'>) => {
  useLoadingAction(foodList.updateState, () => patchFood(food));
};

const forms = ref<Array<InstanceType<typeof FFoodListForm>>>();

const onSubmit = async () => {
  if (!forms.value) return;

  for (const form of forms.value) {
    const foodValues = await form.getFormValues();
    if (!foodValues) continue;

    const prevFoods = foodItemsOrEmpty.value.filter((food) => food.category === form.category);

    for (let i = 0; i < foodValues.length; i++) {
      const food = foodValues[i];
      const prevFood = prevFoods[i];
      if (!prevFood) useLoadingAction(foodList.createState, () => postFood({ ...food, type: props.type }));
      else if (food.name !== prevFood.name)
        useLoadingAction(foodList.updateState, () => patchFood({ id: prevFood.id, name: food.name }));
    }
  }
  Notify.updateSuccess();
};

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
      ref="forms"
      v-for="category in categories"
      :key="category"
      :category="category"
      :init-values="foodItemsOrEmpty.filter((food) => food.category === category)"
      @remove="onRemove"
      @create="onCreate"
      @edit="onEdit"
      mb-1.5rem
    />
    <div flex flex-row justify-end>
      <SBtn
        @click="onSubmit"
        :icon="symRoundedDone"
        :loading="foodList.updateState.isLoading() || foodList.createState.isLoading()"
      />
    </div>
  </SComponentWrapper>
</template>
