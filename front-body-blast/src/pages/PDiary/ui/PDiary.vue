<script setup lang="ts">
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary';
import { useDiaryStore } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

const { getDiaryResponse, getDiary } = useDiaryStore();
useLoadingAction(getDiaryResponse, getDiary);

const diaryData = computed(() => getDiaryResponse.data?.data);
const first = computed(() => diaryData.value?.[0]);
</script>

<template>
  <div h-full>
    <EDiaryHeader v-if="first" :diary="first" />
    <WSelfControl v-if="diaryData" :slides="diaryData" />
    <SNoResultsScreen v-else p-1.5rem />
  </div>
</template>
