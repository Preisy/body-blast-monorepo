import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { Notify, useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib';
import { AdminFood, AdminFoodService } from '..';

export const useAdminFoodStore = defineStore('admin-food-store', () => {
  const foodList = ref(useSingleState<AdminFood.Get.Response>({ update: true, delete: true, create: true }));
  const getFoods = (pagination?: AdminFood.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: foodList.value,
      serviceAction: AdminFoodService.getFoods(pagination),
    });

  const food = ref(useSingleState<AdminFood.GetById.Response>());
  const getFoodById = (data: AdminFood.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: food.value,
      serviceAction: AdminFoodService.getFoodById(data),
    });

  const postFood = (data: AdminFood.Post.Dto) =>
    useStoreAction({
      state: foodList.value.createState,
      serviceAction: AdminFoodService.postFood(data),
      onSuccess: (res) => {
        const listData = foodList.value.data;
        if (!listData) return;

        listData.data.push(res.data);
        listData.count++;
        Notify.createSuccess();
      },
    });

  const patchFood = (data: AdminFood.Patch.Dto) =>
    useStoreAction({
      state: foodList.value.updateState,
      serviceAction: AdminFoodService.patchFood(data),
      onSuccess: (res) => {
        const foodListData = foodList.value.data?.data;
        if (!foodListData) return;
        const foodIndex = foodListData.findIndex((food) => food.id === res.data.id);
        assign(foodListData[foodIndex], res.data);
        Notify.updateSuccess();
      },
    });

  const deleteFood = (data: AdminFood.Delete.Dto) =>
    useStoreAction({
      state: foodList.value.deleteState,
      serviceAction: AdminFoodService.deleteFood(data),
      onSuccess: (res) => {
        if (!res.status) return;

        const foodListData = foodList.value.data?.data;
        if (!foodListData) return;

        const foodIndex = foodListData.findIndex((food) => food.id === data.id);
        foodListData.splice(foodIndex, 1);
        Notify.deleteSuccess();
      },
    });

  const deleteFoodByType = (data: AdminFood.DeleteByType.Dto) =>
    useStoreAction({
      state: foodList.value.deleteState,
      serviceAction: AdminFoodService.deleteFoodByType(data),
      onSuccess: (res) => {
        if (!res.status) return;

        const foodListData = foodList.value.data?.data;
        if (!foodListData) return;

        const filteredFood = foodListData.filter((food) => food.type === data.type);
        filteredFood.forEach((food) => {
          const index = foodListData.findIndex((item) => item.id === food.id);
          foodListData.splice(index, 1);
        });
        Notify.deleteSuccess();
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
    deleteFoodByType,
  };
});
