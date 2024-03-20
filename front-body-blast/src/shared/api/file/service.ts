import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { File } from './types';

export const fileService = {
  getFileByName: useServiceAction((data: File.Dto) =>
    api.get<File.Response>(`/admin/files/${data.filename}`, { responseType: 'blob', timeout: 1000 * 60 * 60 }),
  ),
};
