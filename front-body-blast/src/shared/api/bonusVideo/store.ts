import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { LearningService } from './service';
import { BonusVideo } from './types';

export const useBonusVideoStore = defineStore('bonus-video-store', () => {
  const getVideosResponse = ref(useSingleState<BonusVideo.Get.Response>());
  const getVideos = () =>
    useSimpleStoreAction({
      stateWrapper: getVideosResponse.value,
      serviceAction: LearningService.getVideos(),
    });

  const getVideoByIdResponse = ref(useSingleState<BonusVideo.GetById.Response>());
  const getVideoById = (id: BonusVideo.GetById.Dto['id']) =>
    useSimpleStoreAction({
      stateWrapper: getVideoByIdResponse.value,
      serviceAction: LearningService.getVideoById(id),
    });

  return { getVideosResponse, getVideos, getVideoByIdResponse, getVideoById };
});
