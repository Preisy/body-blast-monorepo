<script setup lang="ts">
import { WFooterNavBar } from 'widgets/footer';
import { FNotification } from 'features/notification';
import { ENUMS } from 'shared/lib/enums';
import LDashboard from './LDashboard.vue';

const isHidden = computed(() => useRoute().name === ENUMS.ROUTES_NAMES.PROFILE_EDIT);
</script>

<template>
  <FNotification />
  <LDashboard>
    <template #footer>
      <WFooterNavBar v-if="!isHidden" />
    </template>
  </LDashboard>
</template>
