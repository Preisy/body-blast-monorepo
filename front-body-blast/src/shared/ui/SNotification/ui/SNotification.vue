<script setup lang="ts">
import { symRoundedError } from '@quasar/extras/material-symbols-rounded';

export interface SNotificationProps {
  text: string;
}
defineProps<SNotificationProps>();
</script>

<template>
  <div rounded-0.75rem bg-primary px-1rem py-0.75rem>
    <p>{{ $t('global.notification.attention') }}</p>
    <div flex flex-row items-center text-1.25rem text-secondary>
      <q-icon :name="symRoundedError" mr-0.25rem />
      <div font-bold>{{ text }}</div>
    </div>
  </div>
</template>
