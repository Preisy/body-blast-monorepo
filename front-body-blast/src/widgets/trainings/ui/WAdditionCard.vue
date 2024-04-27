<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useWorkoutStore, Workout } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

export interface WAdditionCardProps {
  workout: Workout;
}
const props = defineProps<WAdditionCardProps>();

const validationSchema = Workout.validation().pick({ comment: true });
const { workouts, patchWorkout } = useWorkoutStore();
const onsubmit = (values: z.infer<typeof validationSchema>) => {
  useLoadingAction(workouts.updateState, () =>
    patchWorkout({ id: props.workout.id, data: { comment: values.comment } }),
  );
};
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ $t('dashboard.trainings.addition.title') }}</h1>
    <SForm
      p="0!"
      @submit="onsubmit"
      :field-schema="toTypedSchema(validationSchema)"
      :loading="workouts.updateState.isLoading()"
      :init-values="{ comment: workout.comment ? workout.comment : '' }"
    >
      <SInput name="comment" :placeholder="$t('dashboard.trainings.addition.input')" />
    </SForm>
  </SComponentWrapper>
</template>
