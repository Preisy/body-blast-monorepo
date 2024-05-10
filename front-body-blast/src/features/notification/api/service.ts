import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib';
import { Notification } from '..';

export const notificationService = {
  getNotifications: useServiceAction(() => api.get<Notification.Get.Response>(`/me/notifications`)),
};
