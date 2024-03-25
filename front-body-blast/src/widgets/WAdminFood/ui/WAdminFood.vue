<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { FFoodListForm } from 'features/FNutritionListForm';
import { useAdminFoodStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Food } from 'shared/api/food';
import { useLoadingAction } from 'shared/lib/loading';
import { Notify } from 'shared/lib/utils';
import { SBtn } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

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
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ type }}</h1>

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
