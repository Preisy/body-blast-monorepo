<script setup lang="ts">
import moment from 'moment';
import { WAdditionCard } from 'widgets/WAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useWorkoutStore } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { SCalendar } from 'shared/ui/SCalendar';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const { getWorkouts, workouts } = useWorkoutStore();

const today = moment();
const date = ref(moment().toISOString());
const page = computed(() => moment(date.value).diff(today, 'days')); //distance in days

//pick workout of certain date
watchEffect(() =>
  useLoadingAction(workouts.state, () => getWorkouts({ page: page.value + 1, limit: 1, expanded: true })),
);

const workoutsData = computed(() => workouts.data?.data);
const workout = computed(() => workoutsData.value?.[0]);
</script>

<template>
  <SStructure>
    <SCalendar v-model="date" mask="YYYY-MM-DD" />

    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-if="!workouts.state.isSuccess() || !workout">
        <SNoResultsScreen p-1.5rem />
      </SSplideSlide>
      <template v-else>
        <SSplideSlide v-for="exercise in workout.exercises" :key="exercise.name">
          <ETrainingCard :exercises="exercise" py-1.5rem />
        </SSplideSlide>
        <SSplideSlide>
          <WAdditionCard :id="workout.id" py-1.5rem />
        </SSplideSlide>
      </template>
    </SSplide>
  </SStructure>
</template>
