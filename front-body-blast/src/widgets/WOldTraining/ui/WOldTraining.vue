<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit } from '@quasar/extras/material-symbols-rounded';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { Workout } from 'shared/api/workout';
import { SBtn } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WOldWorkoutsProps {
  workout: Workout;
}
defineProps<WOldWorkoutsProps>();
</script>

<template>
  <SComponentWrapper>
    <div flex gap-x-0.5rem>
      <SReadonlyField
        :title="$t('admin.prompt.training.cycle')"
        :value="workout.loop"
        mb-1rem
        bg-accent
        px-1rem
        py-0.75rem
        class="[&>.title]:text-sm [&>.value]:text-base"
      />
      <SBtn :icon="symRoundedEdit" bg="bg!" ml-auto />
      <SBtn :icon="symRoundedDelete" />
    </div>
    <ETrainingCard v-for="exercise in workout.exercises" :key="exercise.id" :exercises="exercise" p="0!" mb-1rem />
  </SComponentWrapper>
</template>
