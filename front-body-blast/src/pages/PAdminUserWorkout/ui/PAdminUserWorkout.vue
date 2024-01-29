<script setup lang="ts">
import moment from 'moment';
import { WNewTraining } from 'widgets/WNewTraining';
import { WOldTraining } from 'widgets/WOldTraining';
import { SCalendar } from 'shared/ui/SCalendar';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserWorkoutProps {
  id: string;
}
defineProps<PAdminUserWorkoutProps>();

const date = ref(moment().toISOString());
const isToday = computed(() => moment().diff(date.value.split('/').join('-'), 'days') === 0);
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <SCalendar v-model="date" pb-1rem pt-2rem />
      <WNewTraining v-if="isToday" :date="date" :id="parseInt(id)" />
      <WOldTraining v-else :id="id" />
    </SProxyScroll>
  </SStructure>
</template>
