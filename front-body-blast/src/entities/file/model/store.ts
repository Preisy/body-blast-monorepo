import { defineStore } from 'pinia';
import { ISingleState, useSingleState, useStoreAction } from 'shared/lib';
import { fileService, File } from '..';

export interface URLHandler {
  link: string;
  destructor: () => unknown;
}

export const useFileStore = defineStore('file-store', () => {
  const getFileResponse = ref(useSingleState<URLHandler>());
  const getFileByName = (data: File.Dto, stateWrapper?: ISingleState<URLHandler>) =>
    useStoreAction({
      state: stateWrapper?.state ?? getFileResponse.value.state,
      serviceAction: fileService.getFileByName(data),
      onSuccess: (file) => {
        const link = URL.createObjectURL(file);
        const destructor = () => URL.revokeObjectURL(link);
        const data: URLHandler = { link, destructor };
        if (stateWrapper) stateWrapper.data = data;
        else getFileResponse.value.data = data;
      },
    });

  return {
    getFileByName,
    getFileResponse,
  };
});
