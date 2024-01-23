import { defineStore } from 'pinia';
import { ISingleState, useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminFileService } from './service';
import { File } from './types';

export const useFileStore = defineStore('file-store', () => {
  const getFileResponse = ref(useSingleState<File.Response>());
  const getFileByName = (data: File.Dto, stateWrapper?: ISingleState<File.Response>) =>
    useSimpleStoreAction({
      stateWrapper: stateWrapper ?? getFileResponse.value,
      serviceAction: adminFileService.getFileByName(data),
    });

  return {
    getFileByName,
    getFileResponse,
  };
});
