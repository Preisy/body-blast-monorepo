<script setup lang="ts">
import moment from 'moment';
import { FWorkoutCommentaryForm } from 'features/workout';
import { EWorkoutExerciseCard, useWorkoutStore } from 'entities/workout';
import { useLoadingAction, getUTC3Date, gtCreation, isEqualDates } from 'shared/lib';
import { SCalendar, SDatePagination, SSplide, SSplideSlide, SStructure } from 'shared/ui';

const { getWorkouts, workouts } = useWorkoutStore();

const today = getUTC3Date();
const date = ref(today.format('YYYY-MM-DD'));

const offset = ref(0);
const halfRange = ref(3);

const workoutsData = computed(() => workouts.data?.data);
useLoadingAction(workouts, () =>
  getWorkouts({
    expanded: true,
    from: moment(date.value).subtract(halfRange.value, 'd').format('YYYY-MM-DD'),
    to: moment(date.value).add(halfRange.value, 'd').format('YYYY-MM-DD'),
  }),
);
</script>

<template>
  <SStructure h-full>
    <SCalendar
      :model-value="date"
      @update:model-value="(val) => (date = val.split('/').join('-'))"
      :options="(date) => gtCreation(date)"
      py-1rem
    />

    <SDatePagination
      v-model="date"
      :half-range="halfRange"
      :offset="offset"
      @need-fetch="(from, to) => getWorkouts({ from, to, expanded: true })"
      p="0!"
    >
      <template #item="{ date: dd }">
        <SSplide
          v-if="workoutsData && workoutsData.find((workout) => isEqualDates(workout.date, dd))"
          :options="{ direction: 'ttb', height: '100vh' }"
        >
          <SSplideSlide
            v-for="exercise in workoutsData.find((workout) => isEqualDates(workout.date, dd))!.exercises"
            :key="exercise.name"
          >
            <EWorkoutExerciseCard :exercise="exercise" py-1.5rem />
          </SSplideSlide>

          <SSplideSlide>
            <h1 mb-1rem px-1.5rem>{{ $t('dashboard.workout.addition.title') }}</h1>

            <FWorkoutCommentaryForm :workout="workoutsData.find((workout) => isEqualDates(workout.date, dd))!" />
          </SSplideSlide>
        </SSplide>
      </template>
    </SDatePagination>
  </SStructure>
</template>
