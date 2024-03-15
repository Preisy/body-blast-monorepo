<script setup lang="ts">
import moment from 'moment';
import { WAdditionCard } from 'widgets/WAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useWorkoutStore } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { gtCreation } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const { getWorkouts, workouts } = useWorkoutStore();

const date = ref(moment());
const dateAsString = computed(() => date.value.format('YYYY-MM-DD'));

//pick workout of certain date
watch(
  date,
  () =>
    useLoadingAction(workouts.state, () =>
      getWorkouts({
        from: date.value.format('YYYY-MM-DD'),
        to: date.value.clone().add(1, 'd').format('YYYY-MM-DD'),
        expanded: true,
      }),
    ),
  { immediate: true },
);

const workoutsData = computed(() => workouts.data?.data);
const workout = computed(() => workoutsData.value?.[0]);
</script>

<template>
  <SStructure>
    <SCalendar
      :model-value="dateAsString"
      @update:model-value="(val) => (date = moment(val))"
      mask="YYYY-MM-DD"
      :options="(date) => gtCreation(date)"
      my-1rem
    />

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
