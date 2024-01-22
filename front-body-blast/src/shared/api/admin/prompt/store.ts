import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminPromptsService } from './service';
import { Prompt } from './types';

export const useAdminPromptStore = defineStore('admin-prompt-store', () => {
  const prompts = ref(useSingleState<Array<Prompt>>());
  const getPrompts = () =>
    useSimpleStoreAction({
      stateWrapper: prompts.value,
      serviceAction: adminPromptsService.getPrompts(),
    });

  const postPromptsState = ref(useSingleState<Prompt.Response>());
  const postPrompts = (data: Array<Prompt>) =>
    useSimpleStoreAction({
      stateWrapper: postPromptsState.value,
      serviceAction: adminPromptsService.postPrompts(data),
    });

  return {
    prompts,
    getPrompts,
    postPrompts,
    postPromptsState,
  };
});
