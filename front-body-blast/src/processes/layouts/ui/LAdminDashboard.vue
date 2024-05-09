<script setup lang="ts">
import { ENUMS } from 'shared/lib';
import AdminFooterNavBar from './AdminFooterNavBar.vue';
import BaseDashboard from './BaseDashboard.vue';

const isHidden = computed(() => useRoute().name === ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO);
</script>

<template>
  <BaseDashboard>
    <template #footer>
      <AdminFooterNavBar v-if="!isHidden" />
    </template>
  </BaseDashboard>
</template>
