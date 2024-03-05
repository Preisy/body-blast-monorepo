<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable boundaries/element-types -->
<script setup lang="ts">
import { symRoundedError } from '@quasar/extras/material-symbols-rounded';
import { QIcon } from 'quasar';
import { i18n } from 'app/boot/i18n';
import { NotificationTypes } from 'shared/api/notification';

export interface SNotificationProps {
  type: NotificationTypes;
}
defineProps<SNotificationProps>();

const { t } = i18n.global;
</script>

<template>
  <div rounded-0.75rem bg-primary px-1rem py-0.75rem>
    <p>{{ t('global.notification.attention') }}</p>
    <div flex flex-row items-center text-1.25rem text-secondary>
      <!-- <QIcon :name="symRoundedError" mr-0.25rem /> -->

      <!-- See SNotification/i18n -->
      <div font-bold>{{ t(`notification.${type}`) }}</div>
    </div>
  </div>
</template>
