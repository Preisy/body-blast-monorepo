import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminFileService } from './service';
import { File } from './types';

export const useAdminFileStore = defineStore('admin-file-store', () => {
  const getFileState = ref(useSingleState<File.Response>());
  const getFileByName = (data: File.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFileState.value,
      serviceAction: adminFileService.getFileByName(data),
    });

  return {
    getFileByName,
    getFileState,
  };
});
