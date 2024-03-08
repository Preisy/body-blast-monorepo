<script setup lang="ts">
import { WFooterNavBar } from 'widgets/WFooterNavBar';
import { SNotification } from 'shared/ui/SNotification';
import LDashboard from './LDashboard.vue';
</script>

<template>
  <SNotification />
  <LDashboard>
    <template #footer>
      <WFooterNavBar />
    </template>
  </LDashboard>
</template>
