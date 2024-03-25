import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { LearningService } from './service';
import { BonusVideo } from './types';

export const useBonusVideoStore = defineStore('bonus-video-store', () => {
  const videoList = ref(useSingleState<BonusVideo.Get.Response>());
  const getVideos = () =>
    useSimpleStoreAction({
      stateWrapper: videoList.value,
      serviceAction: LearningService.getVideos(),
    });

  const video = ref(useSingleState<BonusVideo.GetById.Response>());
  const getVideoById = (id: BonusVideo.GetById.Dto['id']) =>
    useSimpleStoreAction({
      stateWrapper: video.value,
      serviceAction: LearningService.getVideoById(id),
    });

  return { videoList, getVideos, video, getVideoById };
});
