<script setup lang="ts">
import { symRoundedClose, symRoundedError } from '@quasar/extras/material-symbols-rounded';
import { useMeStore } from 'shared/api/me';
import { NotificationTypes, notificationBus, useNotificationStore } from 'shared/api/notification';

const currentNotificationType = ref<NotificationTypes | null>(null);
const classList = computed(() => (currentNotificationType.value === null ? 'translate-y--150%' : 'translate-y-0'));

const { me } = useMeStore();
const { getNotifications, notificationsQueue } = useNotificationStore();

const showAllNotifications = () => {
  let nextNotification = notificationsQueue.data?.pop(); // Take last
  if (!nextNotification) return; // If nothing to show - return
  notificationBus.emit('notify', nextNotification);

  notificationBus.on('notification-hide', () => {
    let nextNotification = notificationsQueue.data?.pop();
    if (!nextNotification) return;
    notificationBus.emit('notify', nextNotification);
  });
};

notificationBus.on('notify', (newType: NotificationTypes) => {
  currentNotificationType.value = newType;
});

const onClose = () => {
  currentNotificationType.value = null;
  setTimeout(() => notificationBus.emit('notification-hide'), 500);
};

onMounted(async () => {
  if (me.data?.data) {
    await getNotifications({ id: me.data.data.id });
    if (notificationsQueue.state.isSuccess()) showAllNotifications();
  }
});
</script>

<template>
  <div
    left="50%"
    translate-x="-50%"
    min-w="70%"
    fixed
    top-0.5rem
    z-9999
    flex
    flex-row
    rounded-0.75rem
    bg-primary
    px-1rem
    py-0.75rem
    transition-transform-300
    ease-in-out
    :class="classList"
  >
    <div>
      <p text-bg>{{ $t('global.notification.attention') }}</p>
      <div flex flex-row items-center text-1.25rem text-secondary>
        <q-icon :name="symRoundedError" mr-0.25rem />

        <!-- See SNotification/i18n -->
        <div v-if="currentNotificationType" font-bold>{{ $t(`notification.${currentNotificationType}`) }}</div>
      </div>
    </div>
    <q-btn :icon="symRoundedClose" text-color="bg" @click="onClose" ml-auto w-2rem />
  </div>
</template>
