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

const dateRaw = ref(moment());
const isoDate = ref(moment().format('YYYY-MM-DD'));
const calendarDate = computed(() => moment(isoDate.value).format('YYYY/MM/DD'));

const fetch = (from: string, to: string) => {
  useLoadingAction(userDiaries, async () => {
    await Promise.allSettled([
      getUserDiaries({ id: props.id, pagination: { expanded: true, from, to } }),
      getUserSteps({ id: props.id, pagination: { expanded: true, from, to } }),
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
  //TODO: api issue in steps response
  // startDate: 19.02
  // endDate: 25.05
  // month applied only to endDate
  const groupedByMonth = groupBy(stepsData.value?.weeks, ({ endDate }) => {
    const [dd, mm] = endDate.split('.');
    const isoEndDate = `${moment().year()}-${mm}-${dd}`;
    if (dd == '01') return moment(isoEndDate).subtract(1, 'month').format('MM');
    else return moment(isoEndDate).format('MM');
  });

  return groupedByMonth;
});
</script>

<template>
  <SStructure h-full flex flex-col>
    <SCalendar
      :model-value="calendarDate"
      @update:model-value="(v) => (dateRaw = moment(v.split('/').join('-')))"
      default-view="Months"
      :emit-immediately="true"
      today-btn
      py-1rem
    />

    <SDatePagination v-model="isoDate" :half-range="1" :offset="0" @need-fetch="fetch" type="months">
      <template #item="{ date: month }">
        <SProxyScroll h-full>
          <EStepsList :weeks="stepsSlides[moment(month).format('MM')] ?? []" mb-2rem />
          <ESelfControlList
            v-for="(slides, week) in diariesSlides[moment(month).format('YYYY-MM')]"
            :key="week"
            :slides="slides"
            :week="'' + week"
          />
        </SProxyScroll>
      </template>
    </SDatePagination>
  </SStructure>
</template>
