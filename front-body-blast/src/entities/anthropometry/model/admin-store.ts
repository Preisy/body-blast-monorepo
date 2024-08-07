import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib';
import { anthropometryAdminService, AdminAnthropometry } from '..';

export const useAdminAnthropometryStore = defineStore('admin-anthropometry-store', () => {
  const anthropometryList = ref(useSingleState<AdminAnthropometry.Get.Response>());
  const getAnthropometry = (data: AdminAnthropometry.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: anthropometryList.value,
      serviceAction: anthropometryAdminService.getAnthropometry(data),
    });

  const anthropometry = ref(useSingleState<AdminAnthropometry.GetById.Response>());
  const getAnthropometryById = (data: AdminAnthropometry.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: anthropometry.value,
      serviceAction: anthropometryAdminService.getAnthropometryById(data),
    });

  return { anthropometryList, anthropometry, getAnthropometry, getAnthropometryById };
});
