import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { fileEventBus, AdminFile } from '..';

export const adminFileService = {
  postFile: useServiceAction((data: AdminFile.Post.Dto) =>
    api.post<AdminFile.Post.Response>('/admin/files', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 1000 * 60 * 60, //1000ms(1s) * 60(1min) * 60(1hr)
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.total ? progressEvent.loaded / progressEvent.total : 0;

        fileEventBus.emit('uploadProgress', {
          filename: data.file.name,
          progress,
          estimated: progressEvent.estimated,
        });
        if (progress === 1) fileEventBus.emit('uploadDone', { filename: data.file.name });
      },
    }),
  ),
  getFiles: useServiceAction((data: AdminFile.Get.Dto) =>
    api.get<AdminFile.Get.Response>(`/admin/files?page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`, {
      timeout: 1000 * 60 * 60, //1000ms(1s) * 60(1min) * 60(1hr)
    }),
  ),
  getFileByName: useServiceAction((data: AdminFile.GetByName.Dto) =>
    api.get<AdminFile.GetByName.Response>(`/admin/files/${data.filename}`, {
      responseType: 'blob',
      timeout: 1000 * 60 * 60, //1000ms(1s) * 60(1min) * 60(1hr)
    }),
  ),
};
