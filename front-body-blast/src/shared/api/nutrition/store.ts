import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { ProductsService } from './service';
import { Nutrition } from './types';

export const useNutritionStore = defineStore('diet-store', () => {
  const nutritionList = ref(useSingleState<Nutrition.Get.Response>());
  const getNutrition = (pagination?: Nutrition.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: nutritionList.value,
      serviceAction: ProductsService.getNutrition(pagination),
    });
  return { nutritionList, getNutrition };
});
