<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit } from '@quasar/extras/material-symbols-rounded';
import { FGetAuthFiles } from 'features/file';
import { EWorkoutExerciseCard, Workout, useAdminWorkoutStore } from 'entities/workout';
import { useLoadingAction } from 'shared/lib';
import { SBtn, SReadonlyField, SComponentWrapper } from 'shared/ui';

export interface WEditWorkoutsProps {
  workout: Workout;
}
const props = defineProps<WEditWorkoutsProps>();
const emit = defineEmits<{
  edit: [Workout];
}>();

const { deleteWorkout, workoutList } = useAdminWorkoutStore();

const onEdit = async () => {
  emit('edit', props.workout);
};
const onDelete = () => useLoadingAction(workoutList.deleteState, () => deleteWorkout(props.workout.id));
</script>

<template>
  <SComponentWrapper>
    <div flex gap-x-0.5rem>
      <SReadonlyField
        :title="$t('admin.prompt.workout.cycle')"
        :value="workout.cycle"
        mb-1rem
        bg-accent
        px-1rem
        py-0.75rem
        class="[&>.title]:text-sm [&>.value]:text-base"
      />
      <SBtn @click="onEdit" :icon="symRoundedEdit" bg="bg!" ml-auto />
      <SBtn @click="onDelete" :icon="symRoundedDelete" :loading="workoutList.deleteState.isLoading()" />
    </div>
    <FGetAuthFiles
      v-for="exercise in workout.exercises"
      :key="exercise.id"
      :urls="[exercise.videoLink, exercise.photoLink]"
    >
      <!-- TODO: looks like bad design -->
      <template #default="{ links, loading }">
        <EWorkoutExerciseCard
          :exercise="exercise"
          :video-link="links[0]"
          :photo-link="links[1]"
          :loading="loading"
          p="0!"
          mb-1rem
        />
      </template>
    </FGetAuthFiles>
  </SComponentWrapper>
</template>
