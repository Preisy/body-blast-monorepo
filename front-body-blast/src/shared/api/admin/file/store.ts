import { defineStore } from 'pinia';
import { ISingleState, useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminFileService } from './service';
import { AdminFile } from './types';

export const useAdminFileStore = defineStore('admin-file-store', () => {
  const getFileState = ref(useSingleState<AdminFile.GetByName.Response>());
  const getFileByName = (
    data: AdminFile.GetByName.Dto,
    stateWrapper: ISingleState<AdminFile.GetByName.Response> = getFileState.value,
  ) =>
    useSimpleStoreAction({
      stateWrapper,
      serviceAction: adminFileService.getFileByName(data),
    });

  const getFilesState = ref(useSingleState<AdminFile.Get.Response>());
  const getFiles = (data: AdminFile.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getFilesState.value,
      serviceAction: adminFileService.getFiles(data),
    });

  const postFileState = ref(useSingleState<AdminFile.Post.Response>());
  const postFile = (data: AdminFile.Post.Dto) =>
    useSimpleStoreAction({
      stateWrapper: postFileState.value,
      serviceAction: adminFileService.postFile(data),
    });

  return {
    getFileByName,
    getFileState,
    getFilesState,
    getFiles,
    postFileState,
    postFile,
  };
});
