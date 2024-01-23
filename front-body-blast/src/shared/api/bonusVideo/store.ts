import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { LearningService } from './service';
import { BonusVideo } from './types';

export const useBonusVideoStore = defineStore('bonus-video-store', () => {
  const videos = ref(useSingleState<BonusVideo.Response>());
  const getVideos = () =>
    useSimpleStoreAction({
      stateWrapper: videos.value,
      serviceAction: LearningService.getVideos(),
    });

  const video = ref(useSingleState<BonusVideo>());
  const getVideoById = (id: string | number) =>
    useSimpleStoreAction({
      stateWrapper: video.value,
      serviceAction: LearningService.getVideoById(id),
    });

  return { videos, getVideos, video, getVideoById };
});
