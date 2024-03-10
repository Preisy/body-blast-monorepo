import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
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
    });

  return { anthropometry, getAnthropometry, patchAnthropometry };
});
