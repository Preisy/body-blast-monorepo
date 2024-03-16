<script setup lang="ts">
import moment from 'moment';
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary/EDiaryHeader';
import { useDiaryStore } from 'shared/api/diary';
import { useMeStore } from 'shared/api/me';
import { useLoadingAction } from 'shared/lib/loading';
import { toWeekRange } from 'shared/lib/utils';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

const today = moment();
const { diaryList, getDiary } = useDiaryStore();
useLoadingAction(diaryList, () =>
  getDiary({
    expanded: true,
    from: today.clone().subtract(1, 'w').toISOString(),
    to: today.clone().add(1, 'w').toISOString(),
  }),
);

const diaryData = computed(() => diaryList.data?.data);

const { me } = useMeStore();
const meData = computed(() => me.data?.data);
const lastWeek = computed(() => diaryData.value?.filter((diary) => moment(diary.date).isSame(today, 'week')));
const stepsSum = computed(
  () =>
    lastWeek.value?.reduce(
      (acc, item) => (acc += item.steps ?? 0), // steps is nullable, so += 0 by default
      0, //acc start value
    ) ?? 0, // if no lastWeek.value, then 0
);
const week = computed(() => {
  const date = lastWeek.value?.[0]?.date;
  if (!date) return;
  return toWeekRange(date);
});
</script>

<template>
  <div h-full>
    <EDiaryHeader
      v-if="meData"
      :steps-goal="meData.stepsGoal"
      :steps-sum="stepsSum"
      :week="week ?? $t('global.error')"
    />
    <WSelfControl v-if="diaryData && diaryData.length" :slides="diaryData" />
    <SNoResultsScreen v-else p-1.5rem />
  </div>
</template>
