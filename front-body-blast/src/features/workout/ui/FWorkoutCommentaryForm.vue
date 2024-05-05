<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Workout, useWorkoutStore } from 'shared/api';
import { useLoadingAction } from 'shared/lib';
import { SInput, SForm } from 'shared/ui';

export interface Props {
  workout: Workout;
}
const props = defineProps<Props>();

const validationSchema = Workout.validation().pick({ comment: true });
const { workouts, patchWorkout } = useWorkoutStore();
const onsubmit = (values: z.infer<typeof validationSchema>) => {
  useLoadingAction(workouts.updateState, () =>
    patchWorkout({ id: props.workout.id, data: { comment: values.comment } }),
  );
};
</script>

<template>
  <SForm
    @submit="onsubmit"
    :field-schema="toTypedSchema(validationSchema)"
    :loading="workouts.updateState.isLoading()"
    :init-values="{ comment: workout.comment && workout.comment !== 'null' ? workout.comment : '' }"
  >
    <SInput name="comment" :placeholder="$t('dashboard.workout.addition.input')" />
  </SForm>
</template>
