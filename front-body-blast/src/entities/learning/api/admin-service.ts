import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AdminBonusVideo } from '..';

export const AdminBonusVideoService = {
  getVideos: useServiceAction(() => api.get<AdminBonusVideo.Get.Response>('/admin/bonus-video')),
  getVideoById: useServiceAction((id: AdminBonusVideo.GetById.Dto['id']) =>
    api.get<AdminBonusVideo.GetById.Response>(`/admin/bonus-video/${id}`),
  ),
  postVideo: useServiceAction((data: AdminBonusVideo.Post.Dto) =>
    api.post<AdminBonusVideo.Post.Response>(`/admin/bonus-video`, data),
  ),
  deleteVideo: useServiceAction((id: AdminBonusVideo.Delete.Dto['id']) =>
    api.delete<AdminBonusVideo.Delete.Response>(`/admin/bonus-video/${id}`),
  ),
};
