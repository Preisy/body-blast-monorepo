<script setup lang="ts">
import { symRoundedError } from '@quasar/extras/material-symbols-rounded';
import { NotificationTypes, notificationBus } from 'shared/api/notification';

const currentNotificationType = ref<NotificationTypes | null>(null);
const classList = computed(() => (currentNotificationType.value === null ? 'translate-y--150%' : 'translate-y-0'));

notificationBus.on('notify', (newType: NotificationTypes) => {
  currentNotificationType.value = newType;
  setTimeout(() => {
    currentNotificationType.value = null;

    setTimeout(() => notificationBus.emit('notification-hide'), 500); //300ms to hide + some delay before next notification
  }, 2000); // time on screen - 2 seconds
});
</script>

<template>
  <div
    left="50%"
    translate-x="-50%"
    fixed
    top-0.5rem
    z-9999
    rounded-0.75rem
    bg-primary
    px-1rem
    py-0.75rem
    transition-transform-300
    ease-in-out
    min-w="70%"
    :class="classList"
  >
    <p text-bg>{{ $t('global.notification.attention') }}</p>
    <div flex flex-row items-center text-1.25rem text-secondary>
      <q-icon :name="symRoundedError" mr-0.25rem />

      <!-- See SNotification/i18n -->
      <div v-if="currentNotificationType" font-bold>{{ $t(`notification.${currentNotificationType}`) }}</div>
    </div>
  </div>
</template>
