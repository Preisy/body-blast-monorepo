import { defineStore } from 'pinia';
import { Notify, useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib';
import { BonusVideo, AdminBonusVideoService, AdminBonusVideo } from '..';

export const useAdminBonusVideoStore = defineStore('admin-bonus-video-store', () => {
  const videoList = ref(useSingleState<AdminBonusVideo.Get.Response>({ delete: true, create: true }));
  const getVideos = () =>
    useSimpleStoreAction({
      stateWrapper: videoList.value,
      serviceAction: AdminBonusVideoService.getVideos(),
    });

  const video = ref(useSingleState<AdminBonusVideo.GetById.Response>());
  const getVideoById = (id: AdminBonusVideo.GetById.Dto['id']) =>
    useSimpleStoreAction({
      stateWrapper: video.value,
      serviceAction: AdminBonusVideoService.getVideoById(id),
    });

  const deleteVideo = (id: AdminBonusVideo.Delete.Dto['id']) =>
    useStoreAction({
      state: videoList.value.deleteState,
      serviceAction: AdminBonusVideoService.deleteVideo(id),
      onSuccess: (res) => {
        if (!res.status) return;
        const listData = videoList.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((video) => video.id === id);
        listData.splice(index, 1);
      },
    });

  const postVideo = async (data: { name: BonusVideo['name']; videoLink: string }) =>
    useStoreAction({
      state: videoList.value.createState,
      serviceAction: AdminBonusVideoService.postVideo({ name: data.name, linkUrl: data.videoLink }),
      onSuccess: (res) => {
        const listData = videoList.value.data?.data;
        if (!listData) return;

        listData.push(res.data);
        Notify.createSuccess();
      },
    });

  return { videoList, getVideos, video, getVideoById, deleteVideo, postVideo };
});
