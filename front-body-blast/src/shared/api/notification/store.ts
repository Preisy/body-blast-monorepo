import { defineStore } from 'pinia';
import { useSingleState, useStoreAction } from 'shared/lib/utils';
import { notificationBus } from './bus';
import { notificationService } from './service';
import { Notification, NotificationTypes } from './types';

export const useNotificationStore = defineStore('notification-store', () => {
  const notificationsQueue = ref(useSingleState<Array<NotificationTypes>>());
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

  const showNotification = (notification: NotificationTypes) => {
    notificationBus.emit('notify', notification);
  };

  const showAllNotifications = () => {
    let nextNotification = notificationsQueue.value.data?.pop(); // Take last
    if (!nextNotification) return; // If nothing to show - return

    notificationBus.emit('notify', nextNotification); // Show last notification

    // Callback
    const notificationHideCallback = () => {
      if (!nextNotification) {
        // If nothing to show - disable listener
        notificationBus.off('notification-hide', notificationHideCallback);
        return; // And return
      }
      // Else - show next notification
      notificationBus.emit('notify', nextNotification);
      // Pop another
      nextNotification = notificationsQueue.value.data?.pop();
    };
    // SNotification emits 'notification-hide' after it hides
    notificationBus.on('notification-hide', notificationHideCallback);
  };

  return { notificationsQueue, getNotifications, showNotification, showAllNotifications };
});
