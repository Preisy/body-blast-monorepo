import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { SelfControlService } from './service';
import { SelfControl } from './types';

export const useSelfControlStore = defineStore('self-control-store', () => {
  const getSelfControlResponse = ref(useSingleState<SelfControl.Get.Response>());
  const getSelfControl = () =>
    useSimpleStoreAction({
      stateWrapper: getSelfControlResponse.value,
      serviceAction: SelfControlService.get(),
    });

  const getSelfControlByIdResponse = ref(useSingleState<SelfControl.GetById.Response>());
  const getSelfControlById = () =>
    useSimpleStoreAction({
      stateWrapper: getSelfControlByIdResponse.value,
      serviceAction: SelfControlService.getById(),
    });

  const patchSelfControlResponse = ref(useSingleState<SelfControl.Patch.Response>());
  const patchSelfControl = () =>
    useSimpleStoreAction({
      stateWrapper: patchSelfControlResponse.value,
      serviceAction: SelfControlService.patch(),
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
