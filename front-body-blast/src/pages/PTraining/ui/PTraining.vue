<script setup lang="ts">
import { WAdditionCard } from 'widgets/WAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useWorkoutStore } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const { getWorkouts, getWorkoutsResponse } = useWorkoutStore();
useLoadingAction(getWorkoutsResponse, getWorkouts);

const exercises = computed(() => getWorkoutsResponse.data?.data.at(0)?.exercises);
</script>

<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-if="!getWorkoutsResponse.state.isSuccess()">
        <SNoResultsScreen />
      </SSplideSlide>
      <SSplideSlide v-for="exercise in exercises" :key="exercise.name">
        <ETrainingCard :exercises="exercise" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <WAdditionCard py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
