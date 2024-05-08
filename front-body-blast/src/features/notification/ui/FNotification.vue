<script setup lang="ts">
import { symRoundedClose, symRoundedError } from '@quasar/extras/material-symbols-rounded';
import { useUserStore } from 'shared/api';
import { ENUMS } from 'shared/lib/enums';
import { NotificationTypes, notificationBus, useNotificationStore } from '..';

const router = useRouter();
const currentNotificationType = ref<NotificationTypes | null>(null);
const classList = computed(() => (currentNotificationType.value === null ? 'translate-y--150%' : 'translate-y-0'));
const page = computed(() => {
  if (!currentNotificationType.value) return undefined;
  const map: Record<NotificationTypes, string> = {
    diary: ENUMS.ROUTES_NAMES.DIARY,
    anthropometrics: ENUMS.ROUTES_NAMES.PROFILE,
  };
  return map[currentNotificationType.value];
});

const { user } = useUserStore();
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

const redirect = () => {
  router.push({ name: page.value });
  onClose();
};

onMounted(async () => {
  if (user.data?.data) {
    await getNotifications();
    if (notificationsQueue.state.isSuccess()) showAllNotifications();
  }
});
</script>

<template>
  <div
    left="50%"
    translate-x="-50%"
    class="w-[calc(100%-2rem)]"
    :class="classList"
    fixed
    top-0.5rem
    z-9999
    max-w-450px
    flex
    flex-row
    select-none
    rounded-0.75rem
    bg-primary
    px-1rem
    py-0.75rem
    transition-transform-300
    ease-in-out
  >
    <div @click="redirect" w-full>
      <p text-0.85rem tracking-tighter text-bg>{{ $t('global.notification.attention') }}</p>
      <div flex flex-row items-center text-1rem text-secondary>
        <q-icon :name="symRoundedError" mr-0.25rem />

        <!-- See i18n -->
        <div v-if="currentNotificationType" font-bold>{{ $t(`notification.${currentNotificationType}`) }}</div>
      </div>
    </div>
    <q-btn :icon="symRoundedClose" text-color="bg" @click="onClose" ml-auto w-2rem />
  </div>
</template>
