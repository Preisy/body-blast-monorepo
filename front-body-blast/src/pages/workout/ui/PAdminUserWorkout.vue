<script setup lang="ts">
import moment from 'moment';
import { WCreateWorkout, WEditWorkout } from 'widgets/workout';
import { Workout, useAdminWorkoutStore } from 'entities/workout';
import { AppBaseEntity } from 'shared/api';
import { useLoadingAction, getUTC3Date, gtCreation, isEqualDates } from 'shared/lib';
import { SCalendar, SStructure, SDatePagination, SProxyScroll } from 'shared/ui';

export interface PAdminUserWorkoutProps {
  id: AppBaseEntity['id'];
}
const props = defineProps<PAdminUserWorkoutProps>();

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
    userId: props.id,
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
      @need-fetch="(from, to) => getWorkouts({ from, to, expanded: true, userId: id })"
      p="0!"
    >
      <template #item="{ date: dd }">
        <SProxyScroll h-full type="vertical">
          <WEditWorkout
            v-if="
              !editingWorkout && workoutListData && workoutListData.find((workout) => isEqualDates(workout.date, dd))
            "
            :workout="workoutListData.find((workout) => isEqualDates(workout.date, dd))!"
            @edit="onEdit"
          />
          <WCreateWorkout
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
