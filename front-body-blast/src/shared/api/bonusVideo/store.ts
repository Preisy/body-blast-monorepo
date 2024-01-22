import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { LearningService } from './service';
import { BonusVideo } from './types';

export const useBonusVideoStore = defineStore('bonus-video-store', () => {
  const videos = ref(useSingleState<Array<BonusVideo>>());
  const getVideos = () =>
    useSimpleStoreAction({
      stateWrapper: videos.value,
      serviceAction: LearningService.getVideos(),
    });

  return { videos, getVideos };
});
