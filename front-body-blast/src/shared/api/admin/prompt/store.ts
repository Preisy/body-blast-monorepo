import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { useAdminFileStore } from '../file';
import { adminPromptsService } from './service';
import { Prompt } from './types';

export const useAdminPromptStore = defineStore('admin-prompt-store', () => {
  const fileStore = useAdminFileStore();

  const getPromptsResponse = ref(useSingleState<Prompt.Get.Response>());
  const getPrompts = async (data: Prompt.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getPromptsResponse.value,
      serviceAction: adminPromptsService.getPrompts(data),
    });

  const postPromptsResponse = ref(useSingleState<Prompt.Post.Response>());
  const postPrompts = async (data: Array<Prompt.Post.Dto>) => {
    postPromptsResponse.value.state.loading();
    for (const prompt of data) {
      const photoLink = await fileStore.postFile({ file: prompt.photo });
      if (!photoLink.data) {
        console.error(photoLink.error);
        postPromptsResponse.value.state.error();
        return;
      }
      const videoLink = await fileStore.postFile({ file: prompt.video });
      if (!videoLink.data) {
        console.error(videoLink.error);
        postPromptsResponse.value.state.error();
        return;
      }

      const promptDto = { type: prompt.type, photoLink: photoLink.data.link, videoLink: videoLink.data.link };
      await useSimpleStoreAction({
        stateWrapper: postPromptsResponse.value,
        serviceAction: adminPromptsService.postPrompt(promptDto),
      });
    }
  };

  const deletePromptResponse = ref(useSingleState<Prompt.Delete.Response>());
  const deletePrompt = async (data: Prompt.Delete.Dto) =>
    useSimpleStoreAction({
      stateWrapper: deletePromptResponse.value,
      serviceAction: adminPromptsService.deletePrompt(data),
    });

  const patchPromptResponse = ref(useSingleState<Prompt.Patch.Response>());
  const patchPrompt = async (id: string | number, data: Prompt.Patch.Dto) => {
    patchPromptResponse.value.state.loading();
    const photoLink = await fileStore.postFile({ file: data.photo });
    if (!photoLink.data) {
      console.error(photoLink.error);
      postPromptsResponse.value.state.error();
      return;
    }

    const videoLink = await fileStore.postFile({ file: data.video });
    if (!videoLink.data) {
      console.error(videoLink.error);
      postPromptsResponse.value.state.error();
      return;
    }

    const promptDto = { type: data.type, photoLink: photoLink.data.link, videoLink: videoLink.data.link };
    await useSimpleStoreAction({
      stateWrapper: patchPromptResponse.value,
      serviceAction: adminPromptsService.patchPrompt(id, promptDto),
    });
  };

  return {
    getPromptsResponse,
    getPrompts,
    postPrompts,
    postPromptsResponse,
    deletePromptResponse,
    deletePrompt,
    patchPromptResponse,
    patchPrompt,
  };
});
