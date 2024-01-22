import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { BonusVideo } from './types';

export const LearningVideos: BonusVideo[] = [
  {
    id: 1,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    name: 'Мышцы груди',
    linkUrl: 'https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4',
  },
  {
    id: 2,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    name: 'Мышцы пальцев',
    linkUrl: 'https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4',
  },
  {
    id: 3,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    name: 'Мышцы челюсти',
    linkUrl: 'https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4',
  },
];

//TODO: api
export const LearningService = {
  getVideos: useServiceAction(() => requestSimulator<BonusVideo[]>(LearningVideos)),
};
