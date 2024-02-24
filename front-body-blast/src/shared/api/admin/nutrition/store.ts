import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { adminNutritionService } from './service';
import { AdminNutrition } from './types';

export const useAdminNutritionStore = defineStore('admin-nutrition-store', () => {
  const nutritions = ref(useSingleState<AdminNutrition.Get.Response>({ create: true, update: true, delete: true }));
  const getNutritions = (data?: AdminNutrition.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: nutritions.value,
      serviceAction: adminNutritionService.getNutritions(data),
    });

  const getNutritionByIdResponse = ref(useSingleState<AdminNutrition.GetById.Response>());
  const getNutritionById = (data: AdminNutrition.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getNutritionByIdResponse.value,
      serviceAction: adminNutritionService.getNutritionById(data),
    });

  const postNutrition = (data: AdminNutrition.Post.Dto) =>
    useStoreAction({
      state: nutritions.value.createState,
      serviceAction: adminNutritionService.postNutrition(data),
    });

  const patchNutrition = (data: AdminNutrition.Patch.Dto) =>
    useStoreAction({
      state: nutritions.value.updateState,
      serviceAction: adminNutritionService.patchNutrition(data),
    });

  const deleteNutrition = (data: AdminNutrition.Delete.Dto) =>
    useStoreAction({
      state: nutritions.value.deleteState,
      serviceAction: adminNutritionService.deleteNutrition(data),
    });

  return {
    getNutritions,
    nutritions,
    getNutritionById,
    getNutritionByIdResponse,
    postNutrition,
    patchNutrition,
    deleteNutrition,
  };
});
