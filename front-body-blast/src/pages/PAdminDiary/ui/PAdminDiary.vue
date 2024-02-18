<script setup lang="ts">
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';

export interface PAdminDiaryProps {
  id: number;
}
defineProps<PAdminDiaryProps>();
const { getSelfControlResponse, getSelfControl } = useAdminDiaryStore();
const slides = computed(() => getSelfControlResponse.data?.data);
</script>

<template>
  <div>
    <SSplide :options="{}">
      <SSplideSlide>
        <WStepsMonitoring />
      </SSplideSlide>
      <SSplideSlide v-for="slide in slides" :key="slide.id" />
    </SSplide>
  </div>
</template>
