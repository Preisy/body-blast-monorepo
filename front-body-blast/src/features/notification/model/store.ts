import { defineStore } from 'pinia';
import { useSingleState, useStoreAction } from 'shared/lib';
import { notificationService, NotificationTypes } from '..';

export const useNotificationStore = defineStore('notification-store', () => {
  const notificationsQueue = ref(useSingleState<Array<NotificationTypes>>());
  const getNotifications = () =>
    useStoreAction({
      state: notificationsQueue.value.state,
      serviceAction: notificationService.getNotifications(),
      onSuccess: (res) => {
        // Object.entries returns the ['diary', true] or ['anthropometrics', false]
        // We will filter out all entries with 'false' value
        const notifications = Object.entries(res)
          .filter((entry) => entry[1])
          .map((entry) => entry[0]) as Array<NotificationTypes>;

        if (!notificationsQueue.value.data) notificationsQueue.value.data = [];
        notificationsQueue.value.data.push(...notifications);
      },
    });

  return { notificationsQueue, getNotifications };
});
