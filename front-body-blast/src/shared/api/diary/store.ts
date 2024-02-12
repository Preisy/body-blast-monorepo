import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { DiaryService } from './service';
import { Diary } from './types';

export const useDiaryStore = defineStore('diary-store', () => {
  const getDiaryResponse = ref(useSingleState<Diary.Get.Response>());
  const getDiary = (pagination?: Diary.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getDiaryResponse.value,
      serviceAction: DiaryService.get(pagination),
    });

  const getDiaryByIdResponse = ref(useSingleState<Diary.GetById.Response>());
  const getDiaryById = (id: string) =>
    useSimpleStoreAction({
      stateWrapper: getDiaryByIdResponse.value,
      serviceAction: DiaryService.getById(id),
    });

  const patchDiaryResponse = ref(useSingleState<Diary.Patch.Response>());
  const patchDiary = (id: string, data: Diary.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchDiaryResponse.value,
      serviceAction: DiaryService.patch(id, data),
    });

  return {
    getDiaryResponse,
    getDiaryByIdResponse,
    getDiary,
    patchDiaryResponse,
    patchDiary,
    getDiaryById,
  };
});
