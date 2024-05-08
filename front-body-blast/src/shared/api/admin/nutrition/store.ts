import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { Notify, useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib';
import { adminNutritionService } from './service';
import { AdminNutrition } from './types';

export const useAdminNutritionStore = defineStore('admin-nutrition-store', () => {
  const nutritionList = ref(useSingleState<AdminNutrition.Get.Response>({ create: true, update: true, delete: true }));
  const getNutritions = (data?: AdminNutrition.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: nutritionList.value,
      serviceAction: adminNutritionService.getNutritions(data),
    });

  const nutrition = ref(useSingleState<AdminNutrition.GetById.Response>());
  const getNutritionById = (data: AdminNutrition.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: nutrition.value,
      serviceAction: adminNutritionService.getNutritionById(data),
    });

  const postNutrition = (data: AdminNutrition.Post.Dto) =>
    useStoreAction({
      state: nutritionList.value.createState,
      serviceAction: adminNutritionService.postNutrition(data),
      onSuccess: () => {
        Notify.createSuccess();
      },
    });

  const patchNutrition = (data: AdminNutrition.Patch.Dto) =>
    useStoreAction({
      state: nutritionList.value.updateState,
      serviceAction: adminNutritionService.patchNutrition(data),
      onSuccess: (res) => {
        const nutritionListData = nutritionList.value.data?.data;
        if (!nutritionListData) return;
        const index = nutritionListData.findIndex((food) => food.id === res.data.id);
        assign(nutritionListData[index], res.data);
        Notify.updateSuccess();
      },
    });

  const deleteNutrition = (data: AdminNutrition.Delete.Dto) =>
    useStoreAction({
      state: nutritionList.value.deleteState,
      serviceAction: adminNutritionService.deleteNutrition(data),
      onSuccess: (res) => {
        if (!res.status) return;

        const nutritionListData = nutritionList.value.data?.data;
        if (!nutritionListData) return;

        const index = nutritionListData.findIndex((food) => food.id === data.id);
        nutritionListData.splice(index, 1);
      },
    });

  return {
    getNutritions,
    nutritionList,
    getNutritionById,
    nutrition,
    postNutrition,
    patchNutrition,
    deleteNutrition,
  };
});
