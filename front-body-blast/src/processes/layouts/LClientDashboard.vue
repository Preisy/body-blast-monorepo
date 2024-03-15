<script setup lang="ts">
import { WFooterNavBar } from 'widgets/WFooterNavBar';
import { ENUMS } from 'shared/lib/enums';
import { SNotification } from 'shared/ui/SNotification';
import LDashboard from './LDashboard.vue';

const isHidden = computed(() => useRoute().name === ENUMS.ROUTES_NAMES.PROFILE_EDIT);
</script>

<template>
  <SNotification />
  <LDashboard>
    <template #footer>
      <WFooterNavBar v-if="!isHidden" />
    </template>
  </LDashboard>
</template>
