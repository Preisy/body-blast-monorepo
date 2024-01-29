<script setup lang="ts">
import { WAdminFooterNavBar } from 'widgets/WAdminFooterNavBar';
import { ENUMS } from 'shared/lib/enums';
import LDashboard from './LDashboard.vue';

const isHidden = computed(() => useRoute().name === ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE_BIO);
</script>

<template>
  <LDashboard>
    <template #footer>
      <WAdminFooterNavBar v-if="!isHidden" />
    </template>
  </LDashboard>
</template>
