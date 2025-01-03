<script setup lang="ts">
import { Dictionary, groupBy } from 'lodash';
import moment from 'moment';
import { ESelfControlList, EStepsList, Diary, useAdminDiaryStore } from 'entities/diary';
import { useAdminUserStore, AppBaseEntity } from 'shared/api';
import { useLoadingAction, toWeekRange } from 'shared/lib';
import { SCalendar, SStructure, SProxyScroll, SDatePagination } from 'shared/ui';

export interface PAdminDiaryProps {
  id: AppBaseEntity['id'];
}
const props = defineProps<PAdminDiaryProps>();
const { getUserSteps, userSteps } = useAdminUserStore();
const { getUserDiaries, userDiaries } = useAdminDiaryStore();

const isoDate = ref(moment().format('YYYY-MM-DD'));
const calendarDate = computed(() => moment(isoDate.value).format('YYYY/MM/DD'));

const fetch = (from: string, to: string) => {
  const firstDayFrom = moment(from).startOf('month').format('YYYY-MM-DD');
  const firstDayTo = moment(to).startOf('month').format('YYYY-MM-DD');

  useLoadingAction(userDiaries, async () => {
    await Promise.allSettled([
      getUserDiaries({ id: props.id, pagination: { expanded: true, from: firstDayFrom, to: firstDayTo } }),
      getUserSteps({ id: props.id, pagination: { expanded: true, from: firstDayFrom, to: firstDayTo } }),
    ]);
  });
};

const diariesData = computed(() => userDiaries.data?.data);
const stepsData = computed(() => userSteps.data);

const diariesSlides = computed(() => {
  const groupedByMonth = groupBy(diariesData.value, ({ date }) => moment(date).format('YYYY-MM')) as Dictionary<
    Diary[] | Dictionary<Diary[]>
  >;
  for (const month in groupedByMonth) {
    const diariesInMonth = groupedByMonth[month] as Diary[];
    groupedByMonth[month] = groupBy(diariesInMonth, ({ date }) => toWeekRange(date));
  }
  return groupedByMonth as Dictionary<Dictionary<Diary[]>>;
});

const stepsSlides = computed(() => {
  // step 1: group all steps by startDate month
  // it has one issue: week can be started in previous month.
  // so we need step 2.
  const groupedByMonth = groupBy(stepsData.value?.weeks, ({ startDate }) => startDate.split('.')[1].toString());

  // step 2: check if first week is correct
  for (const month in groupedByMonth) {
    const slide = groupedByMonth[month];
    // try to find week, which starts in previous month.
    const lastSlide = stepsData.value?.weeks.find(
      ({ startDate, endDate }) =>
        Number(startDate.split('.')[1]) + 1 == Number(month) && endDate.split('.')[1].toString() == month,
    );
    // if finds -> add it to the start
    if (lastSlide) slide.unshift(lastSlide);
  }

  return groupedByMonth;
});

const onCalendarUpdate = (v: string) => {
  isoDate.value = v.split('/').join('-');
};

const halfRange = ref(3);
onBeforeMount(() =>
  fetch(
    moment(isoDate.value).subtract(halfRange.value, 'month').format('YYYY-MM-DD'),
    moment(isoDate.value).add(halfRange.value, 'month').format('YYYY-MM-DD'),
  ),
);
</script>

<template>
  <SStructure h-full flex flex-col>
    <SCalendar
      :model-value="calendarDate"
      @update:model-value="onCalendarUpdate"
      default-view="Months"
      :emit-immediately="true"
      today-btn
      py-1rem
    />

    <SDatePagination v-model="isoDate" :half-range="halfRange" :offset="0" @need-fetch="fetch" type="months" p="0!">
      <template #item="{ date: month }">
        <SProxyScroll>
          <div p-1.5rem>
            <EStepsList :weeks="stepsSlides[moment(month).format('MM')] ?? []" mb-2rem />
            <ESelfControlList
              v-for="(slides, week) in diariesSlides[moment(month).format('YYYY-MM')]"
              :key="week"
              :slides="slides"
              :week="'' + week"
            />
          </div>
        </SProxyScroll>
      </template>
    </SDatePagination>
  </SStructure>
</template>
