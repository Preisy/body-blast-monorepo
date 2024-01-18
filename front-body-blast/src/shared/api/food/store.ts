import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { FoodService } from './service';
import { Food } from './types';

export const useFoodStore = defineStore('food-store', () => {
  const getFoodResponse = ref(useSingleState<Food.Response>());
  const getFood = () =>
    useSimpleStoreAction({
      stateWrapper: getFoodResponse.value,
      serviceAction: FoodService.getFood(),
    });
  return { getFoodResponse, getFood };
});
