import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { SelfControlService } from './service';
import { SelfControl } from './types';

export const useSelfControlStore = defineStore('self-control-store', () => {
  const getSelfControlResponse = ref(useSingleState<SelfControl.Get.Response>());
  const getSelfControl = (pagination?: SelfControl.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getSelfControlResponse.value,
      serviceAction: SelfControlService.get(pagination),
    });

  const getSelfControlByIdResponse = ref(useSingleState<SelfControl.GetById.Response>());
  const getSelfControlById = (id: string) =>
    useSimpleStoreAction({
      stateWrapper: getSelfControlByIdResponse.value,
      serviceAction: SelfControlService.getById(id),
    });

  const patchSelfControlResponse = ref(useSingleState<SelfControl.Patch.Response>());
  const patchSelfControl = (id: string, data: SelfControl.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchSelfControlResponse.value,
      serviceAction: SelfControlService.patch(id, data),
    });

  return {
    getSelfControlResponse,
    getSelfControlByIdResponse,
    getSelfControl,
    patchSelfControlResponse,
    patchSelfControl,
    getSelfControlById,
  };
});
