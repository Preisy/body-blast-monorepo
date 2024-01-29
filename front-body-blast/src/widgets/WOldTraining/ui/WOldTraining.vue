<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit } from '@quasar/extras/material-symbols-rounded';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';

export interface WOldWorkoutsProps {
  id: string | number;
}
defineProps<WOldWorkoutsProps>();

const { getWorkoutsResponse, getWorkouts } = useAdminWorkoutStore();
useLoading(getWorkoutsResponse);
getWorkouts({});
// if (id) getWorkouts(id);

const trainings = computed(() => getWorkoutsResponse.data?.data);
</script>

<template>
  <SComponentWrapper>
    <SSplide :options="{ direction: 'ttb', height: '40rem' }">
      <SSplideSlide
        v-if="getWorkoutsResponse.state.isError() || (getWorkoutsResponse.state.isSuccess() && !trainings?.length)"
      >
        <SNoResultsScreen />
      </SSplideSlide>
      <SSplideSlide v-for="(training, index) in trainings" :key="training.name">
        <template v-if="training">
          <div flex gap-x-0.5rem v-if="index === 0">
            <!-- TODO: API integration -->
            <SReadonlyField
              :title="$t('admin.prompt.training.cycle')"
              value="2"
              mb-1rem
              bg-accent
              px-1rem
              py-0.75rem
              class="[&>.title]:text-sm [&>.value]:text-base"
            />
            <SBtn :icon="symRoundedEdit" bg="bg!" ml-auto />
            <SBtn :icon="symRoundedDelete" />
          </div>
          <ETrainingCard v-for="exercise in training.exercises" :key="exercise.id" :training="exercise" p="0!" />
        </template>
      </SSplideSlide>
    </SSplide>
  </SComponentWrapper>
</template>
