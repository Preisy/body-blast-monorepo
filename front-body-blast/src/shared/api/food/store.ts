import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { FoodService } from './service';
import { Food } from './types';

export const useFoodStore = defineStore('food-store', () => {
  const getFoodResponse = ref(useSingleState<Food.Get.Response>());
  const getFood = (pagination?: Food.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFoodResponse.value,
      serviceAction: FoodService.getFood(pagination),
    });
  return { getFoodResponse, getFood };
});
