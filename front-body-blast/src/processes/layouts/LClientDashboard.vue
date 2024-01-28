<script setup lang="ts">
import { WFooterNavBar } from 'widgets/WFooterNavBar';
import LDashboard from './LDashboard.vue';
</script>

<template>
  <LDashboard>
    <template #footer>
      <WFooterNavBar />
    </template>
  </LDashboard>
</template>
