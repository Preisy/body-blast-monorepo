import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { useAdminFileStore } from '../file';
import { adminPromptsService } from './service';
import { Prompt } from './types';

export const useAdminPromptStore = defineStore('admin-prompt-store', () => {
  const fileStore = useAdminFileStore();

  const prompts = ref(useSingleState<Prompt.Get.Response>({ update: true, delete: true, create: true }));
  const getPrompts = async (data: Prompt.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: prompts.value,
      serviceAction: adminPromptsService.getPrompts(data),
    });

  const postPrompts = async (data: Array<Prompt.Post.Dto>) => {
    prompts.value.createState.loading();
    for (const prompt of data) {
      const [photoLink, videoLink] = await Promise.all([
        fileStore.postFile({ file: prompt.photo }),
        fileStore.postFile({ file: prompt.video }),
      ]);
      if (!photoLink.data || !videoLink.data) {
        prompts.value.createState.error();
        return;
      }

      const promptDto = { type: prompt.type, photoLink: photoLink.data.link, videoLink: videoLink.data.link };
      await useStoreAction({
        state: prompts.value.createState,
        serviceAction: adminPromptsService.postPrompt(promptDto),
        onSuccess: (res) => {
          const listData = prompts.value.data?.data;
          if (!listData) return;

          listData.push(res.data);
        },
      });
    }
  };

  const deletePrompt = async (data: Prompt.Delete.Dto) =>
    useStoreAction({
      state: prompts.value.deleteState,
      serviceAction: adminPromptsService.deletePrompt(data),
      onSuccess: (res) => {
        if (!res.status) return;
        const listData = prompts.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((prompt) => prompt.id === data.id);
        listData.splice(index, 1);
      },
    });

  const patchPrompt = async (id: string | number, data: Prompt.Patch.Dto) => {
    prompts.value.updateState.loading();
    const photoLink = await fileStore.postFile({ file: data.photo });
    if (!photoLink.data) {
      prompts.value.updateState.error();
      return;
    }

    const videoLink = await fileStore.postFile({ file: data.video });
    if (!videoLink.data) {
      prompts.value.updateState.error();
      return;
    }

    const promptDto = { type: data.type, photoLink: photoLink.data.link, videoLink: videoLink.data.link };
    await useStoreAction({
      state: prompts.value.updateState,
      serviceAction: adminPromptsService.patchPrompt(id, promptDto),
      onSuccess: (res) => {
        const listData = prompts.value.data?.data;
        if (!listData) return;
        const index = listData.findIndex((prompt) => prompt.id === res.data.id);
        assign(listData[index], res.data);
      },
    });
  };

  return {
    prompts,
    getPrompts,
    postPrompts,
    deletePrompt,
    patchPrompt,
  };
});
