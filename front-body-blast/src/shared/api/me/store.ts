import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { MeService } from './service';
import { Me } from './types';

export const useMeStore = defineStore('me-store', () => {
  const me = ref(useSingleState<Me.Response>());
  const getMe = () =>
    useSimpleStoreAction({
      stateWrapper: me.value,
      serviceAction: MeService.getMe(),
    });

  return { me, getMe };
});
