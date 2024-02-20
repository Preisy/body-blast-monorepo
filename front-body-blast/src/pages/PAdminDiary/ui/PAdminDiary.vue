<script setup lang="ts">
import moment from 'moment';
import { WSelfControlMonitoring } from 'widgets/WSelfControlMonitoring';
import { WStepsMonitoring } from 'widgets/WStepsMonitoring';
import { useAdminDiaryStore } from 'shared/api/admin';
import { Diary } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';

export interface PAdminDiaryProps {
  id: number;
}
defineProps<PAdminDiaryProps>();
const { getDiary, getDiaryResponse } = useAdminDiaryStore();

// 2024-02-01T23:59:59.000Z
const dateRaw = ref<string>(moment().toISOString());
// 2024-02-01T00:00:00.000Z
const date = computed<string>(() =>
  moment(dateRaw.value).utcOffset(0).date(1).hour(0).minute(0).seconds(0).milliseconds(0).toISOString(),
);
// 2024-03-01T00:00:00.000 <- Difference with 'date' only in MM field
const dateMonthPlusOne = computed(() => moment(date.value).add(1, 'M').toISOString());

watchEffect(() =>
  //get all diaries in month range
  useLoadingAction(getDiaryResponse, () => getDiary({ expanded: true, from: date.value, to: dateMonthPlusOne.value })),
);

const slides = computed(() => getDiaryResponse.data?.data);

const toWeekRange = (dayString: string) => {
  const date = moment(dayString);
  const dayNumOfWeek = date.day();
  const begin = parseInt(date.format('DD')) - dayNumOfWeek;
  const end = parseInt(date.format('DD')) + dayNumOfWeek;
  return `${begin}-${end}`;
};
const weekSlides = computed(() => {
  const weekSlides: Record<string, Array<Diary>> = {};
  slides.value?.forEach((slide) => {
    const week = toWeekRange(slide.date);
    if (week in weekSlides) weekSlides[week].push(slide);
    else weekSlides[week] = [slide];
  });
  return weekSlides;
});
</script>

<template>
  <SComponentWrapper>
    <SCalendar v-model="dateRaw" default-view="Months" today-btn mask="YYYY-MM-01T23:59:59.000" />

    <SSplide :options="{ direction: 'ttb', height: 'auto' }">
      <SSplideSlide>
        <WStepsMonitoring :data="slides ?? []" />
      </SSplideSlide>
      <SSplideSlide v-for="week in Object.keys(weekSlides)" :key="week">
        <WSelfControlMonitoring :slides="weekSlides[week]" :week="week" />
      </SSplideSlide>
    </SSplide>
  </SComponentWrapper>
</template>
