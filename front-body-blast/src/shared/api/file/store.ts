import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminFileService } from './service';
import { File } from './types';

export const useFileStore = defineStore('file-store', () => {
  const getFileResponse = ref(useSingleState<File.Response>());
  const getFileByName = (data: File.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFileResponse.value,
      serviceAction: adminFileService.getFileByName(data),
    });

  return {
    getFileByName,
    getFileResponse,
  };
});
