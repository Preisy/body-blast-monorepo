import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { Notify, useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { anthropometryService } from './service';
import { Anthropometry } from './types';

export const useProfileStore = defineStore('profile-store', () => {
  const anthropometry = ref(useSingleState<Anthropometry.Get.Response>({ update: true }));
  const getAnthropometry = (pagination: Anthropometry.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: anthropometry.value,
      serviceAction: anthropometryService.getAnthropometry(pagination),
    });

  const patchAnthropometry = (data: Anthropometry.Patch.Dto) =>
    useStoreAction({
      state: anthropometry.value.updateState,
      serviceAction: anthropometryService.patchAnthropometry(data),
      onSuccess: (res) => {
        const listData = anthropometry.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((item) => item.id === data.id);
        if (index === -1) return;

        assign(listData[index], res.data);
        Notify.updateSuccess();
      },
    });

  const clear = () => {
    anthropometry.value = useSingleState({ update: true });
  };

  return { anthropometry, getAnthropometry, patchAnthropometry, clear };
});
