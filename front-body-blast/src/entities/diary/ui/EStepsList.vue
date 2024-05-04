<script setup lang="ts">
import { AdminUser } from 'shared/api/admin';
import { SReadonlyField } from 'shared/ui/inputs';
import { SNoResultsScreen } from 'shared/ui/no-results-screen';

type Week = AdminUser.GetSteps.Response['weeks'][number];
export interface WStepsMonitoringProps {
  weeks: AdminUser.GetSteps.Response['weeks'];
}
defineProps<WStepsMonitoringProps>();

const weekSlideColor = (week: Week) => {
  const status: 'COMPLETED' | 'UNCOMPLETED' = week.steps > week.stepsGoal ? 'COMPLETED' : 'UNCOMPLETED';

  const colors: Record<typeof status, string> = {
    COMPLETED: 'bg-secondary text-primary',
    UNCOMPLETED: 'bg-primary text-bg',
  };
  return colors[status];
};
const weekRange = (week: Week) => `${week.startDate.split('.')[0]}-${week.endDate.split('.')[0]}`;
</script>

<template>
  <div>
    <h1>{{ $t('admin.diary.steps') }}</h1>
    <template v-if="weeks.length">
      <div grid grid-cols-2 mt-1rem gap-0.5rem>
        <SReadonlyField
          v-for="week in weeks"
          :key="weekRange(week)"
          :title="$t('admin.diary.stepsOf') + ' ' + weekRange(week)"
          :value="`${week.steps}/${week.stepsGoal}`"
          :class="weekSlideColor(week)"
        />
      </div>
    </template>
    <SNoResultsScreen v-else />
  </div>
</template>
