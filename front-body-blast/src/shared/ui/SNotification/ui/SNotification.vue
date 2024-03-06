<script setup lang="ts">
import { symRoundedError } from '@quasar/extras/material-symbols-rounded';
import { NotificationTypes, notificationBus } from 'shared/api/notification';

const currentNotificationType = ref<NotificationTypes | null>(null);
const style = computed(() => (currentNotificationType.value === null ? { top: '-100%' } : { top: '1rem' }));

notificationBus.on('notify', (newType: NotificationTypes) => {
  currentNotificationType.value = newType;
  setTimeout(() => {
    currentNotificationType.value = null;
    notificationBus.emit('notification-hide');
  }, 2000);
});
</script>

<template>
  <div
    left="50%"
    translate-x="-50%"
    fixed
    z-9999
    rounded-0.75rem
    bg-primary
    px-1rem
    py-0.75rem
    transition-top-300
    ease-in-out
    min-w="70%"
    :style="style"
  >
    <p text-bg>{{ $t('global.notification.attention') }}</p>
    <div flex flex-row items-center text-1.25rem text-secondary>
      <q-icon :name="symRoundedError" mr-0.25rem />

      <!-- See SNotification/i18n -->
      <div font-bold>{{ $t(`notification.${currentNotificationType}`) }}</div>
    </div>
  </div>
</template>
