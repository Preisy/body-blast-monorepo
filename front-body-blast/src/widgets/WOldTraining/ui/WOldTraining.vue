<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit } from '@quasar/extras/material-symbols-rounded';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { Workout } from 'shared/api/workout';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WOldWorkoutsProps {
  workout: Workout;
}
const props = defineProps<WOldWorkoutsProps>();

const { deleteWorkout, deleteWorkoutResponse, getWorkoutsResponse } = useAdminWorkoutStore();
const unwatchDelete = useLoading(deleteWorkoutResponse);

//TODO
const onEdit = () => console.log('edit');
const onDelete = async () => {
  await deleteWorkout(props.workout.id);
  if (deleteWorkoutResponse.state.isSuccess()) {
    const index = getWorkoutsResponse.data?.data.findIndex((val) => val.id === props.workout.id);
    if (!index) return;
    getWorkoutsResponse.data?.data.splice(index, 1);
  }
};

onUnmounted(() => {
  unwatchDelete();
});
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
      <!-- TODO: onEdit difficult-->
      <SBtn @click="onEdit" :icon="symRoundedEdit" bg="bg!" ml-auto />
      <!-- TODO: onDelete easy-->
      <SBtn @click="onDelete" :icon="symRoundedDelete" :loading="deleteWorkoutResponse.state.isLoading()" />
    </div>
    <ETrainingCard v-for="exercise in workout.exercises" :key="exercise.id" :exercises="exercise" p="0!" mb-1rem />
  </SComponentWrapper>
</template>
