import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib';
import { adminDiaryService, AdminDiary } from '..';

export const useAdminDiaryStore = defineStore('admin-diary-store', () => {
  const diaryList = ref(useSingleState<AdminDiary.Get.Response>({ update: true }));
  const getDiary = (pagination?: AdminDiary.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: diaryList.value,
      serviceAction: adminDiaryService.getDiary(pagination),
    });

  const diary = ref(useSingleState<AdminDiary.GetById.Response>());
  const getDiaryById = (data: AdminDiary.GetById.Dto) =>
    useSimpleStoreAction({
      stateWrapper: diary.value,
      serviceAction: adminDiaryService.getDiaryById(data),
    });

  const userDiaries = ref(useSingleState<AdminDiary.GetUserDiaries.Response>());
  const getUserDiaries = (data: AdminDiary.GetUserDiaries.Dto) =>
    useSimpleStoreAction({
      stateWrapper: userDiaries.value,
      serviceAction: adminDiaryService.getUserDiaries(data),
    });

  const diaryScheme = ref(useSingleState<AdminDiary.GetScheme.Response>({ update: true }));
  const getDiaryScheme = (data: AdminDiary.GetScheme.Dto) =>
    useSimpleStoreAction({
      stateWrapper: diaryScheme.value,
      serviceAction: adminDiaryService.getDiaryScheme(data),
    });

  const patchDiaryScheme = (data: AdminDiary.PatchScheme.Dto) =>
    useStoreAction({
      state: diaryScheme.value.updateState,
      serviceAction: adminDiaryService.patchDiaryScheme(data),
      onSuccess: (res) => {
        const schemeData = diaryScheme.value.data?.data;
        if (!schemeData) return;

        assign(schemeData, res.data);
      },
    });

  const patchDiaryResponse = ref(useSingleState<AdminDiary.Patch.Response>());
  const patchDiary = (data: AdminDiary.Patch.Dto) =>
    useStoreAction({
      state: diaryList.value.updateState,
      serviceAction: adminDiaryService.patchDiary(data),
      onSuccess: (res) => {
        const listData = diaryList.value.data?.data;
        if (!listData) return;

        const diaryIndex = listData.findIndex((diary) => diary.id === data.id);
        assign(listData[diaryIndex], res.data);
      },
    });

  return {
    diaryList,
    getDiary,
    diary,
    getDiaryById,
    patchDiaryResponse,
    patchDiary,
    userDiaries,
    getUserDiaries,
    getDiaryScheme,
    patchDiaryScheme,
    diaryScheme,
  };
});
