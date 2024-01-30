import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AppPagination } from '../pagination';
import { anthropometryService } from './service';
import { Anthropometry } from './types';

export const useProfileStore = defineStore('profile-store', () => {
  const anthropometry = ref(useSingleState<Anthropometry.Response>());
  const getAnthropometry = (pagination: Partial<AppPagination.DateDto>) =>
    useSimpleStoreAction({
      stateWrapper: anthropometry.value,
      serviceAction: anthropometryService.getAnthropometry(pagination),
    });

  return { anthropometry, getAnthropometry };
});
