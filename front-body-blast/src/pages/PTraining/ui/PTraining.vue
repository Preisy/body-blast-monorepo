<script setup lang="ts">
import moment from 'moment';
import { WAdditionCard } from 'widgets/WAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useWorkoutStore } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { getUTC3Date, gtCreation, isEqualDates } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SDatePagination } from 'shared/ui/SDatePagination';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

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
      @update:model-value="(val) => (date = val)"
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
          :options="{ direction: 'ttb', height: '35rem' }"
        >
          <SSplideSlide
            v-for="exercise in workoutsData.find((workout) => isEqualDates(workout.date, dd))!.exercises"
            :key="exercise.name"
          >
            <ETrainingCard :exercises="exercise" py-1.5rem />
          </SSplideSlide>
          <SSplideSlide>
            <WAdditionCard :id="workoutsData.find((workout) => isEqualDates(workout.date, dd))!.id" py-1.5rem />
          </SSplideSlide>
        </SSplide>
      </template>
    </SDatePagination>
  </SStructure>
</template>
