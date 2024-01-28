<script setup lang="ts">
import { WAdditionCard } from 'widgets/WAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useTrainingStore } from 'shared/api/training';
import { useLoading } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const trainingStore = useTrainingStore();
useLoading(trainingStore.trainings);
trainingStore.getTrainings(1, 100); //Debug only

const exercises = computed(() => trainingStore.trainings.data?.data.at(0)?.exercises);
</script>

<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-if="!trainingStore.trainings.state.isSuccess()">
        <SNoResultsScreen />
      </SSplideSlide>
      <SSplideSlide v-for="exercise in exercises" :key="exercise.name">
        <ETrainingCard :training="exercise" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <WAdditionCard py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
