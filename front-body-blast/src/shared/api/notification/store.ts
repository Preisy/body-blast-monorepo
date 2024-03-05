import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { notificationService } from './service';
import { Notification } from './types';

export const useProfileStore = defineStore('profile-store', () => {
  const notifications = ref(useSingleState<Notification.Get.Response>());
  const getNotifications = (data: Notification.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: notifications.value,
      serviceAction: notificationService.getNotifications(data),
    });

  return { notifications, getNotifications };
});
