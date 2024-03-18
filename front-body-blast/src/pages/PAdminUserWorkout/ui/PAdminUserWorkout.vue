<script setup lang="ts">
import moment from 'moment';
import { WNewTraining } from 'widgets/WNewTraining';
import { WOldTraining } from 'widgets/WOldTraining';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Workout } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { getUTC3Date, gtCreation, isEqualDates } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SDatePagination } from 'shared/ui/SDatePagination';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserWorkoutProps {
  id: AppBaseEntity['id'];
}
defineProps<PAdminUserWorkoutProps>();

const today = getUTC3Date();

const date = ref(today.format('YYYY-MM-DD'));
const halfRange = ref(7); //2weeks
const offset = ref(0);

const { getWorkouts, workoutList } = useAdminWorkoutStore();

useLoadingAction(workoutList, () =>
  getWorkouts({
    expanded: true,
    from: moment(date.value).subtract(halfRange.value, 'd').format('YYYY-MM-DD'),
    to: moment(date.value).add(halfRange.value, 'd').format('YYYY-MM-DD'),
  }),
);

const workoutListData = computed(() => workoutList.data?.data);

const editingWorkout = ref<Workout | null>();
const onEdit = (id: Workout) => {
  editingWorkout.value = id;
};
const clearEditing = () => {
  editingWorkout.value = null;
};
</script>

<template>
  <SStructure h-full flex flex-col>
    <SCalendar
      :model-value="date"
      @update:model-value="(newDate) => (date = newDate.split('/').join('-'))"
      :options="(date) => gtCreation(date)"
      mb-1rem
      mt-1rem
    />

    <SDatePagination
      v-model="date"
      :offset="offset"
      :half-range="halfRange"
      @need-fetch="(from, to) => getWorkouts({ from, to, expanded: true })"
      p="0!"
    >
      <template #item="{ date: dd }">
        <SProxyScroll h-full type="vertical">
          <WOldTraining
            v-if="
              !editingWorkout && workoutListData && workoutListData.find((workout) => isEqualDates(workout.date, dd))
            "
            :workout="workoutListData.find((workout) => isEqualDates(workout.date, dd))!"
            @edit="onEdit"
          />
          <WNewTraining
            v-else
            :date="date.split('/').join('-')"
            :id="id"
            :init-values="editingWorkout ?? undefined"
            :workout-id="editingWorkout?.id"
            :is-edit="!!editingWorkout"
            @reject-edit="clearEditing"
            @edit="clearEditing"
          />
        </SProxyScroll>
      </template>
    </SDatePagination>
  </SStructure>
</template>
