import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { Food } from './types';
import { FoodService } from '.';

export const useFoodStore = defineStore('food-store', () => {
  const food = ref(useSingleState<Food.Get.Response>());
  const getFood = (pagination?: Food.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: food.value,
      serviceAction: FoodService.getFood(pagination),
    });
  return { food, getFood };
});
