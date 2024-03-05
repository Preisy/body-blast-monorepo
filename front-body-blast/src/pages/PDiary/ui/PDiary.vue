<script setup lang="ts">
import moment from 'moment';
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary/EDiaryHeader';
import { useDiaryStore } from 'shared/api/diary';
import { useMeStore } from 'shared/api/me';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

const today = moment();
const { diaryList, getDiary } = useDiaryStore();
useLoadingAction(diaryList, () =>
  getDiary({ expanded: true, from: today.clone().subtract(2, 'w').toISOString(), to: today.toISOString() }),
);

const diaryData = computed(() => diaryList.data?.data);

const { me } = useMeStore();
const meData = computed(() => me.data?.data);
const lastWeek = computed(() => diaryData.value?.filter((diary) => moment(diary.date).isSame(today, 'week')));
const stepsSum = computed(() => lastWeek.value?.reduce((acc, item) => (acc += item.steps ?? 0), 0) ?? 0);
</script>

<template>
  <div h-full>
    <!-- TODO: weekNum -->
    <EDiaryHeader v-if="meData" :steps-goal="meData.stepsGoal" :steps-sum="stepsSum" :week-num="1" />
    <WSelfControl v-if="diaryData" :slides="diaryData" />
    <SNoResultsScreen v-else p-1.5rem />
  </div>
</template>
