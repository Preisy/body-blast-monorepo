import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { FoodService } from './service';
import { AdminFood } from './types';

export const useAdminFoodStore = defineStore('admin-food-store', () => {
  const foods = ref(useSingleState<AdminFood.Get.Response>({ update: true, delete: true, create: true }));
  const getFoods = (pagination?: AdminFood.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: foods.value,
      serviceAction: FoodService.getFoods(pagination),
    });

  const getFoodByIdResponse = ref(useSingleState<AdminFood.GetById.Response>());
  const getFoodById = (data: AdminFood.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFoodByIdResponse.value,
      serviceAction: FoodService.getFoodById(data),
    });

  const postFood = (data: AdminFood.Post.Dto) =>
    useStoreAction({
      state: foods.value.createState,
      serviceAction: FoodService.postFood(data),
    });

  const patchFood = (data: AdminFood.Patch.Dto) =>
    useStoreAction({
      state: foods.value.updateState,
      serviceAction: FoodService.patchFood(data),
    });

  const deleteFood = (data: AdminFood.Delete.Dto) =>
    useStoreAction({
      state: foods.value.deleteState,
      serviceAction: FoodService.deleteFood(data),
    });

  return {
    foods,
    getFoods,
    getFoodById,
    getFoodByIdResponse,
    patchFood,
    postFood,
    deleteFood,
  };
});
