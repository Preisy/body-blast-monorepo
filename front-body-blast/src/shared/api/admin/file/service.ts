import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminFile } from './types';

export const adminFileService = {
  postFile: useServiceAction((data: AdminFile.Post.Dto) =>
    api.post<AdminFile.Post.Response>('/admin/files', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  ),
  getFiles: useServiceAction((data: AdminFile.Get.Dto) =>
    api.get<AdminFile.Get.Response>(`/admin/files?page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`),
  ),
  getFileByName: useServiceAction((data: AdminFile.GetByName.Dto) =>
    api.get<AdminFile.GetByName.Response>(`/admin/files/${data.filename}`, { responseType: 'blob' }),
  ),
};
