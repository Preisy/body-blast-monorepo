import { assign } from 'lodash';
import { defineStore } from 'pinia';
//TODO: fix this
// eslint-disable-next-line boundaries/element-types
import { useAdminFileStore } from 'entities/file';
import { Notify, useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib';
import { adminPromptsService, Prompt } from '..';

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
      //TODO: тоже вынести в фичу
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
    Notify.createSuccess();
  };

  const postPrompt = async (data: Pick<Prompt, 'photoLink' | 'videoLink' | 'type'>) =>
    useStoreAction({
      state: prompts.value.createState,
      serviceAction: adminPromptsService.postPrompt(data),
      onSuccess: (res) => {
        const listData = prompts.value.data?.data;
        if (!listData) return;

        listData.push(res.data);
        Notify.createSuccess();
      },
    });

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

    const promptDto: Pick<Prompt.Patch.Dto, 'photoLink' | 'videoLink' | 'type'> = {
      type: data.type,
    };

    if (data.photoLink && !data.photo) promptDto.photoLink = data.photoLink;
    else {
      const photoLink = await fileStore.postFile({ file: data.photo! });
      if (!photoLink.data) {
        prompts.value.updateState.error();
        return;
      }
      promptDto.photoLink = photoLink.data.link;
    }

    if (data.videoLink && !data.video) promptDto.videoLink = data.videoLink;
    else {
      const videoLink = await fileStore.postFile({ file: data.video! });
      if (!videoLink.data) {
        prompts.value.updateState.error();
        return;
      }
      promptDto.videoLink = videoLink.data.link;
    }

    return useStoreAction({
      state: prompts.value.updateState,
      serviceAction: adminPromptsService.patchPrompt(id, promptDto),
      onSuccess: (res) => {
        const listData = prompts.value.data?.data;
        if (!listData) return;
        const index = listData.findIndex((prompt) => prompt.id === res.data.id);
        assign(listData[index], res.data);
        Notify.updateSuccess();
      },
    });
  };

  return {
    prompts,
    getPrompts,
    postPrompts,
    deletePrompt,
    patchPrompt,
    postPrompt,
  };
});
