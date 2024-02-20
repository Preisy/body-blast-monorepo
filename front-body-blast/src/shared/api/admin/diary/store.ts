import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminDiaryService } from './service';
import { AdminDiary } from './types';

export const useAdminDiaryStore = defineStore('admin-diary-store', () => {
  const getDiaryResponse = ref(useSingleState<AdminDiary.Get.Response>());
  const getDiary = (pagination?: AdminDiary.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getDiaryResponse.value,
      serviceAction: adminDiaryService.getDiary(pagination),
    });

  const getDiaryByIdResponse = ref(useSingleState<AdminDiary.GetById.Response>());
  const getDiaryById = (data: AdminDiary.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getDiaryByIdResponse.value,
      serviceAction: adminDiaryService.getDiaryById(data),
    });
  const postDiaryResponse = ref(useSingleState<AdminDiary.Post.Response>());
  const postDiary = (data: AdminDiary.Post.Dto) =>
    useSimpleStoreAction({
      stateWrapper: postDiaryResponse.value,
      serviceAction: adminDiaryService.postDiary(data),
    });
  const patchDiaryResponse = ref(useSingleState<AdminDiary.Patch.Response>());
  const patchDiary = (data: AdminDiary.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchDiaryResponse.value,
      serviceAction: adminDiaryService.patchDiary(data),
    });
  const deleteDiaryResponse = ref(useSingleState<AdminDiary.Delete.Response>());
  const deleteDiary = (data: AdminDiary.Delete.Dto) =>
    useSimpleStoreAction({
      stateWrapper: deleteDiaryResponse.value,
      serviceAction: adminDiaryService.deleteDiary(data),
    });

  return {
    getDiaryResponse,
    getDiary,
    getDiaryByIdResponse,
    getDiaryById,
    postDiaryResponse,
    postDiary,
    patchDiaryResponse,
    patchDiary,
    deleteDiaryResponse,
    deleteDiary,
  };
});
