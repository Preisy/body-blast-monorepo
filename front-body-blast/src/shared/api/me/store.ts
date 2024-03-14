import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { MeService } from './service';
import { Me } from './types';

export const useMeStore = defineStore('me-store', () => {
  const me = ref(useSingleState<Me.Get.Response>({ update: true }));
  const clear = () => (me.value = useSingleState<Me.Get.Response>({ update: true }));
  const getMe = () =>
    useSimpleStoreAction({
      stateWrapper: me.value,
      serviceAction: MeService.getMe(),
    });

  const patchMe = (data: Me.Patch.Dto) =>
    useStoreAction({
      state: me.value.updateState,
      serviceAction: MeService.patchMe(data),
    });

  return { me, getMe, clear, patchMe };
});
