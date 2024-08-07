import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib';
import { BonusVideo } from '..';

export const LearningService = {
  getVideos: useServiceAction(() => api.get<BonusVideo.Get.Response>('/bonus-video')),
  getVideoById: useServiceAction((id: BonusVideo.GetById.Dto['id']) =>
    api.get<BonusVideo.GetById.Response>(`/bonus-video/${id}`),
  ),
};
