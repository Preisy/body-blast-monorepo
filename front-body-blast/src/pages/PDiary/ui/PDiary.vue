<script setup lang="ts">
import moment from 'moment';
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary/EDiaryHeader';
import { useDiaryStore } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

const { getDiaryResponse, getDiary } = useDiaryStore();
useLoadingAction(getDiaryResponse, () => getDiary({ expanded: true }));

const today = moment();
const diaryData = computed(() => getDiaryResponse.data?.data);
const firstInWeek = computed(() => diaryData.value?.find((diary) => moment(diary.date).diff(today, 'weeks') < 7));
</script>

<template>
  <div h-full>
    <EDiaryHeader v-if="firstInWeek" :diary="firstInWeek" />
    <WSelfControl v-if="diaryData" :slides="diaryData" />
    <SNoResultsScreen v-else p-1.5rem />
  </div>
</template>
entities/diary/EDiaryHeader
