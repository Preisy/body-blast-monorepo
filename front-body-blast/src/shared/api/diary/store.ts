import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { Notify, useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { AppBaseEntity } from '../base';
import { DiaryService } from './service';
import { Diary } from './types';

export const useDiaryStore = defineStore('diary-store', () => {
  const diaryList = ref(useSingleState<Diary.Get.Response>({ update: true }));
  const getDiary = (pagination?: Diary.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: diaryList.value,
      serviceAction: DiaryService.get(pagination),
    });

  const diary = ref(useSingleState<Diary.GetById.Response>());
  const getDiaryById = (id: string) =>
    useSimpleStoreAction({
      stateWrapper: diary.value,
      serviceAction: DiaryService.getById(id),
    });

  const patchDiary = (id: AppBaseEntity.Dto['id'], data: Diary.Patch.Dto) =>
    useStoreAction({
      state: diaryList.value.updateState,
      serviceAction: DiaryService.patch(id, data),
      onSuccess: (res) => {
        const listData = diaryList.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((diary) => diary.id === id);
        if (index === -1) return;

        assign(listData[index], res.data);
        Notify.updateSuccess();
      },
    });

  return {
    diaryList,
    diary,
    getDiary,
    patchDiary,
    getDiaryById,
  };
});
