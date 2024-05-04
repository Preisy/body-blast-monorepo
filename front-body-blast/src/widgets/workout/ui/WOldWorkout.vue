<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit } from '@quasar/extras/material-symbols-rounded';
import { EWorkoutCard } from 'entities/workout';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { Workout } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/component-wrapper';
import { SReadonlyField } from 'shared/ui/inputs';

export interface WOldWorkoutsProps {
  workout: Workout;
}
const props = defineProps<WOldWorkoutsProps>();
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
    <EWorkoutCard v-for="exercise in workout.exercises" :key="exercise.id" :exercises="exercise" p="0!" mb-1rem />
  </SComponentWrapper>
</template>
