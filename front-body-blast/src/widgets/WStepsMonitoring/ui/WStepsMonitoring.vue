<script setup lang="ts">
import { Diary } from 'shared/api/diary';
import { toWeekRange } from 'shared/lib/utils';
import { SReadonlyField } from 'shared/ui/inputs';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

export interface WStepsMonitoringProps {
  data: Array<Diary>;
}
const props = defineProps<WStepsMonitoringProps>();

interface WeekSlide {
  week: string;
  sum: number;
  steps: number;
  status: 'COMPLETED' | 'UNCOMPLETED';
}

const stepsSlides = computed(() => {
  const weeks: Record<string, WeekSlide> = {};

  props.data.forEach((diary) => {
    if (!diary.sum || !diary.steps) return;

    const week = toWeekRange(diary.date);
    if (week in weeks) {
      weeks[week].steps += diary.steps;
      weeks[week].status = weeks[week].steps >= weeks[week].sum ? 'COMPLETED' : 'UNCOMPLETED';
    } else {
      weeks[week] = { steps: diary.steps, sum: diary.sum, week, status: 'UNCOMPLETED' };
    }
  });

  return weeks;
});

const weekStatusToClass = (status: WeekSlide['status']) => {
  const colors: Record<WeekSlide['status'], string> = {
    COMPLETED: 'bg-secondary text-primary',
    UNCOMPLETED: 'bg-primary text-bg',
  };
  return colors[status];
};
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
          :value="`${slide.steps}/${slide.sum}`"
          :class="weekStatusToClass(slide.status)"
        />
      </div>
    </template>
    <SNoResultsScreen v-else />
  </div>
</template>
