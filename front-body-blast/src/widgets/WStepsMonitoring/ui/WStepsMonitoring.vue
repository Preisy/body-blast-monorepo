<script setup lang="ts">
import moment from 'moment';
import { Diary } from 'shared/api/diary';
import { SReadonlyField } from 'shared/ui/inputs';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

export interface WStepsMonitoringProps {
  data: Array<Diary>;
}
const props = defineProps<WStepsMonitoringProps>();

interface WeekSlide {
  week: string;
  target: number;
  sum: number;
}

const toWeekRange = (dayString: string) => {
  const date = moment(dayString);
  const dayNumOfWeek = date.day();
  const begin = parseInt(date.format('DD')) - dayNumOfWeek;
  const end = parseInt(date.format('DD')) + dayNumOfWeek;
  return `${begin}-${end}`;
};

const stepsSlides = computed(() => {
  const weeks: Record<string, WeekSlide> = {};

  props.data.forEach((diary) => {
    if (!diary.sum || !diary.steps) return;

    const week = toWeekRange(diary.date);
    if (week in weeks) weeks[week].sum += diary.sum;
    else {
      weeks[week] = { sum: diary.sum, target: diary.steps, week };
    }
  });

  return weeks;
});
</script>

<template>
  <div>
    <h1>{{ $t('admin.diary.steps') }}</h1>
    <template v-if="data.length">
      <div grid grid-cols-2 mt-1rem gap-0.5rem>
        <SReadonlyField
          v-for="slide in stepsSlides"
          :key="slide.week"
          :title="slide.week"
          :value="`${slide.sum}/${slide.target}`"
        />
      </div>
    </template>
    <SNoResultsScreen v-else />
  </div>
</template>
