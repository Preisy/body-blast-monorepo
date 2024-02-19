<script setup lang="ts">
import { WSelfControlMonitoring } from 'widgets/WSelfControlMonitoring';
import { WStepsMonitoring } from 'widgets/WStepsMonitoring';
import { useAdminDiaryStore } from 'shared/api/admin';
import { useLoadingAction } from 'shared/lib/loading';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';

export interface PAdminDiaryProps {
  id: number;
}
defineProps<PAdminDiaryProps>();
const { getDiary, getDiaryResponse } = useAdminDiaryStore();
useLoadingAction(getDiaryResponse, getDiary);
const slides = computed(() => getDiaryResponse.data?.data);
</script>

<template>
  <SComponentWrapper>
    <SSplide :options="{}">
      <SSplideSlide>
        <WStepsMonitoring :data="slides ?? []" />
      </SSplideSlide>
      <SSplideSlide v-for="slide in slides" :key="slide.id">
        <WSelfControlMonitoring :data="slide" />
      </SSplideSlide>
    </SSplide>
  </SComponentWrapper>
</template>
