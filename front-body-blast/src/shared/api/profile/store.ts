import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AppPagination } from '../base';
import { profileService } from './service';
import { Anthropometry } from './types';

export const useProfileStore = defineStore('profile-store', () => {
  const anthropometry = ref(useSingleState<Anthropometry.Response>());
  const getAnthropometry = (pagination: Partial<AppPagination.DateDto>) =>
    useSimpleStoreAction({
      stateWrapper: anthropometry.value,
      serviceAction: profileService.getAnthropometry(pagination),
    });

  return { anthropometry, getAnthropometry };
});
