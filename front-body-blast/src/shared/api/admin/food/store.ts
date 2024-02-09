import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { FoodService } from './service';
import { AdminFood } from './types';

export const useAdminFoodStore = defineStore('admin-food-store', () => {
  const getFoodsResponse = ref(useSingleState<AdminFood.Get.Response>());
  const getFoods = (pagination?: AdminFood.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFoodsResponse.value,
      serviceAction: FoodService.getFoods(pagination),
    });

  const getFoodByIdResponse = ref(useSingleState<AdminFood.GetById.Response>());
  const getFoodById = (data: AdminFood.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFoodByIdResponse.value,
      serviceAction: FoodService.getFoodById(data),
    });

  const postFoodResponse = ref(useSingleState<AdminFood.Post.Response>());
  const postFood = (data: AdminFood.Post.Dto) =>
    useSimpleStoreAction({
      stateWrapper: postFoodResponse.value,
      serviceAction: FoodService.postFood(data),
    });

  const patchFoodResponse = ref(useSingleState<AdminFood.Patch.Response>());
  const patchFood = (data: AdminFood.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchFoodResponse.value,
      serviceAction: FoodService.patchFood(data),
    });

  const deleteFoodResponse = ref(useSingleState<AdminFood.Delete.Response>());
  const deleteFood = (data: AdminFood.Delete.Dto) =>
    useSimpleStoreAction({
      stateWrapper: deleteFoodResponse.value,
      serviceAction: FoodService.deleteFood(data),
    });

  return {
    getFoodsResponse,
    getFoods,
    getFoodById,
    getFoodByIdResponse,
    patchFood,
    patchFoodResponse,
    postFood,
    postFoodResponse,
    deleteFood,
    deleteFoodResponse,
  };
});
