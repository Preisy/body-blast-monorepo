import { defineStore } from 'pinia';
import { useSingleState, useStoreAction } from 'shared/lib/utils';
import { notificationService } from './service';
import { Notification, NotificationTypes } from './types';

export const useNotificationStore = defineStore('notification-store', () => {
  const notificationsQueue = ref(useSingleState<Array<NotificationTypes>>({ data: ['diary', 'anthropometrics'] }));
  const getNotifications = (data: Notification.Get.Dto) =>
    useStoreAction({
      state: notificationsQueue.value.state,
      serviceAction: notificationService.getNotifications(data),
      onSuccess: (res) => {
        // Object.entries returns the ['diary', true] or ['anthropometrics', false]
        // We will filter out all entries with 'false' value
        const notifications = Object.entries(res.data).filter((entry) => entry[1]) as Array<
          [NotificationTypes, boolean]
        >;
        notificationsQueue.value.data?.push(...notifications.map((notification) => notification[0]));
      },
    });

  return { notificationsQueue, getNotifications };
});
