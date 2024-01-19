<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary/EDiaryHeader';
import { useDiaryStore } from 'shared/api/diary';
import { useSelfControlStore } from 'shared/api/selfControl';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
// const diaryStore = useDiaryStore();
// diaryStore.getSummary();
// diaryStore.getSlides();
// const slides = computed(() => diaryStore.slides.data || []);
// const summary = computed(() => diaryStore.summary.data || { goal: 0, week: '', done: 0 });

const selfControlStore = useSelfControlStore();
useLoadingAction(selfControlStore.getSelfControlResponse, selfControlStore.getSelfControl);

const selfControlData = computed(() => selfControlStore.getSelfControlResponse.data?.data);
const first = computed(() => selfControlData.value?.[0]);
</script>

<template>
  <div h-full>
    <EDiaryHeader v-if="first" v-bind="first" />
    <WSelfControl v-if="selfControlData" :slides="selfControlData" />
    <SNoResultsScreen v-else p-1.5rem />
  </div>
</template>
