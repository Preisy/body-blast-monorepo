<script setup lang="ts">
export interface PAdminDetailedNutritionProps {}
defineProps<PAdminDetailedNutritionProps>();
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <SCalendar v-model="date" pb-1rem pt-2rem />
      <WNewTraining v-if="isToday" />
      <WOldTraining v-else />
    </SProxyScroll>
  </SStructure>
</template>
