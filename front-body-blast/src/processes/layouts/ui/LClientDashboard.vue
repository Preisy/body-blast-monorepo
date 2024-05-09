<script setup lang="ts">
import { FNotification } from 'features/notification';
import { ENUMS } from 'shared/lib';
import BaseDashboard from './BaseDashboard.vue';
import FooterNavBar from './FooterNavBar.vue';

const isHidden = computed(() => useRoute().name === ENUMS.ROUTES_NAMES.PROFILE_EDIT);
</script>

<template>
  <FNotification />
  <BaseDashboard>
    <template #footer>
      <FooterNavBar v-if="!isHidden" />
    </template>
  </BaseDashboard>
</template>
