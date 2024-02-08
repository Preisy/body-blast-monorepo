import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminNutritionService } from './service';
import { AdminNutrition } from './types';

export const useAdminNutritionStore = defineStore('admin-nutrition-store', () => {
  const getNutritionsResponse = ref(useSingleState<AdminNutrition.Get.Response>());
  const getNutritions = (data: AdminNutrition.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getNutritionsResponse.value,
      serviceAction: adminNutritionService.getNutritions(data),
    });

  const getNutritionByIdResponse = ref(useSingleState<AdminNutrition.GetById.Response>());
  const getNutritionById = (data: AdminNutrition.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getNutritionByIdResponse.value,
      serviceAction: adminNutritionService.getNutritionById(data),
    });

  const postNutritionResponse = ref(useSingleState<AdminNutrition.Post.Response>());
  const postNutrition = (data: AdminNutrition.Post.Dto) =>
    useSimpleStoreAction({
      stateWrapper: postNutritionResponse.value,
      serviceAction: adminNutritionService.postNutrition(data),
    });

  const patchNutritionResponse = ref(useSingleState<AdminNutrition.Patch.Response>());
  const patchNutrition = (data: AdminNutrition.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchNutritionResponse.value,
      serviceAction: adminNutritionService.patchNutrition(data),
    });

  const deleteNutritionResponse = ref(useSingleState<AdminNutrition.Delete.Response>());
  const deleteNutrition = (data: AdminNutrition.Delete.Dto) =>
    useSimpleStoreAction({
      stateWrapper: deleteNutritionResponse.value,
      serviceAction: adminNutritionService.deleteNutrition(data),
    });

  return {
    getNutritions,
    getNutritionsResponse,
    getNutritionById,
    getNutritionByIdResponse,
    postNutrition,
    postNutritionResponse,
    patchNutrition,
    patchNutritionResponse,
    deleteNutrition,
    deleteNutritionResponse,
  };
});
