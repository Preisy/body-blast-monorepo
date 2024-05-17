<script setup lang="ts">
import moment from 'moment';
import { WDiary } from 'widgets/diary';
import { EDiaryHeader, useDiaryStore } from 'entities/diary';
import { useUserStore } from 'shared/api';
import { useLoadingAction, getUTC3Date, toWeekRange } from 'shared/lib';
import { SProxyScroll } from 'shared/ui';

const today = getUTC3Date();
const { diaryList, getDiary } = useDiaryStore();

const diaryData = computed(() => diaryList.data?.data);
useLoadingAction(diaryList, () =>
  getDiary({
    expanded: true,
    from: today.clone().subtract(1, 'w').toISOString(),
    to: today.clone().add(1, 'w').toISOString(),
  }),
);

const { user } = useUserStore();
const userData = computed(() => user.data?.data);
const date = ref(moment().format('YYYY-MM-DD'));

const lastWeek = computed(
  () =>
    diaryData.value?.filter((diary) => {
      const [left, right] = toWeekRange(date.value).split('-').map(Number);
      return moment(diary.date).date() >= left && moment(diary.date).date() <= right;
    }),
);
const stepsSum = computed(
  () =>
    lastWeek.value?.reduce(
      (acc, item) => (acc += item.steps ?? 0), // steps is nullable, so += 0 by default
      0, //acc start value
    ) ?? 0, // if no lastWeek.value, then 0
);
const week = computed(() => {
  if (!date.value) return;
  return toWeekRange(date.value);
});
</script>

<template>
  <SProxyScroll h-full type="vertical">
    <EDiaryHeader
      v-if="userData"
      :steps-goal="userData.stepsGoal"
      :steps-sum="stepsSum"
      :week="week ?? $t('global.error')"
      mx-0
      w-full
    />
    <WDiary @update:date="(newDate) => (date = newDate)" />
  </SProxyScroll>
</template>
