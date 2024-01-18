import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { ProductsService } from './service';
import { Nutrition } from './types';

export const useNutritionStore = defineStore('diet-store', () => {
  const nutrition = ref(useSingleState<Nutrition.Response>());
  const getNutrition = () =>
    useSimpleStoreAction({
      stateWrapper: nutrition.value,
      serviceAction: ProductsService.getMockNutrition(),
    });
  return { nutrition, getNutrition };
});
