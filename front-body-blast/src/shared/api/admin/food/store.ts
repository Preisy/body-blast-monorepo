import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { FoodService } from './service';
import { AdminFood } from './types';

export const useAdminFoodStore = defineStore('admin-food-store', () => {
  const foodList = ref(useSingleState<AdminFood.Get.Response>({ update: true, delete: true, create: true }));
  const getFoods = (pagination?: AdminFood.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: foodList.value,
      serviceAction: FoodService.getFoods(pagination),
    });

  const food = ref(useSingleState<AdminFood.GetById.Response>());
  const getFoodById = (data: AdminFood.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: food.value,
      serviceAction: FoodService.getFoodById(data),
    });

  const postFood = (data: AdminFood.Post.Dto) =>
    useStoreAction({
      state: foodList.value.createState,
      serviceAction: FoodService.postFood(data),
      onSuccess: (res) => {
        const listData = foodList.value.data;
        if (!listData) return;

        listData.data.push(res.data);
        listData.count++;
      },
    });

  const patchFood = (data: AdminFood.Patch.Dto) =>
    useStoreAction({
      state: foodList.value.updateState,
      serviceAction: FoodService.patchFood(data),
      onSuccess: (res) => {
        const foodListData = foodList.value.data?.data;
        if (!foodListData) return;
        const foodIndex = foodListData.findIndex((food) => food.id === res.data.id);
        assign(foodListData[foodIndex], res.data);
      },
    });

  const deleteFood = (data: AdminFood.Delete.Dto) =>
    useStoreAction({
      state: foodList.value.deleteState,
      serviceAction: FoodService.deleteFood(data),
      onSuccess: (res) => {
        if (!res.status) return;

        const foodListData = foodList.value.data?.data;
        if (!foodListData) return;

        const foodIndex = foodListData.findIndex((food) => food.id === data.id);
        foodListData.splice(foodIndex, 1);
      },
    });

  return {
    foodList,
    getFoods,
    getFoodById,
    food,
    patchFood,
    postFood,
    deleteFood,
  };
});
