import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { ProductsService } from './service';
import { Nutrition } from './types';

export const useNutritionStore = defineStore('diet-store', () => {
  const getNutritionResponse = ref(useSingleState<Nutrition.Get.Response>());
  const getNutrition = () =>
    useSimpleStoreAction({
      stateWrapper: getNutritionResponse.value,
      serviceAction: ProductsService.getNutrition(),
    });
  return { getNutritionResponse, getNutrition };
});
