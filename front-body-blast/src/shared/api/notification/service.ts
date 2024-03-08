import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { Notification } from './types';

export const notificationService = {
  getNotifications: useServiceAction((data: Notification.Get.Dto) =>
    api.get<Notification.Get.Response>(`/me/notification/${data.id}`),
  ),
};
