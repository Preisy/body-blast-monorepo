<script setup lang="ts">
import { ENUMS } from 'shared/lib';
import { SBtn } from 'shared/ui';

export interface EProfileHeaderProps {
  userName: string;
}
defineProps<EProfileHeaderProps>();
</script>

<template>
  <div m--2 mb-0 border bg-primary p-6 text-bg>
    <h1 mb-0>{{ userName }}</h1>
    <p>{{ $t('home.profile.header.student') }}</p>
    <div mt-4 flex justify-between>
      <slot name="edition">
        <SBtn icon="edit" class="bg-bg!" :to="{ name: ENUMS.ROUTES_NAMES.PROFILE_EDIT }" />
      </slot>
      <slot name="logout" />
    </div>
  </div>
</template>
