<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, omit, uniqueId } from 'lodash';
import moment from 'moment';
import { z } from 'zod';
import { FListControls } from 'features/FListControls';
import { ENewTrainingFields } from 'entities/ENewTrainingFields';
import { useAdminPromptStore, useAdminWorkoutStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Workout } from 'shared/api/workout';
import { useLoading } from 'shared/lib/loading';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

type Exercise = NonNullable<Workout['exercises']>[number];
const ExerciseValidation = Workout.validation().pick({ exercises: true }).shape.exercises.element;

export interface WNewTrainingProps {
  id: number;
  date: string; //ISO date
  isEdit?: boolean;
  workoutId?: number;
}
const props = defineProps<WNewTrainingProps>();
const emit = defineEmits<{
  edit: [];
}>();

const { postWorkout, postWorkoutResponse, patchWorkout, patchWorkoutResponse } = useAdminWorkoutStore();
const { getPromptsResponse, getPrompts } = useAdminPromptStore();

const unwatchPatch = useLoading(patchWorkoutResponse);

const exerciseForms = ref<Array<InstanceType<typeof SForm>>>();
const trainingForm = ref<InstanceType<typeof SForm>>();
const exercises = ref<Array<Partial<Exercise & { key: string }>>>([{ key: uniqueId('workout-') }]);

const onsubmit = async () => {
  if (!exerciseForms.value) return;
  for (let i = 0; i < exerciseForms.value.length; i++) {
    const exerciseForm = exerciseForms.value[i];
    await exerciseForm.handleSubmit((values: z.infer<typeof ExerciseValidation>) => {
      //find prompt with id. use prompt to pick photoLink and videoLink
      const prompt = getPromptsResponse.data?.data.find((prompt) => prompt.id === values._promptId);
      if (!prompt) {
        console.error('Could not find prompt with this id');
        return;
      }

      const exercise: Omit<Exercise, keyof AppBaseEntity | 'workoutId'> = {
        name: values.name,
        pace: values.pace,
        photoLink: prompt.photoLink,
        videoLink: prompt.videoLink,
        repetitions: values.repetitions,
        restTime: parseInt(values.restTime),
        trainerComment: values.trainerComment,
        sets: parseInt(values.sets),
        weight: parseInt(values.weight),
      };

      assign(exercises.value[i], exercise);
    })();
  }

  await trainingForm.value?.handleSubmit((values: z.infer<ReturnType<typeof Workout.validation>>) => {
    const workout: Omit<Workout, keyof AppBaseEntity | 'user'> = {
      name: values.name,
      comment: values.comment,
      date: moment().toISOString(), //today
      exercises: exercises.value.map((training) => omit(training, ['key'])) as Exercise[], //TODO: fix
      loop: parseInt(values.loop),
      userId: props.id,
    };

    if (props.isEdit && props.workoutId) {
      patchWorkout(props.workoutId, workout);
      emit('edit');
    } else {
      postWorkout(workout);
    }
  })();
};
const onadd = () => exercises.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => exercises.value.splice(index, 1);

const unwatchPrompt = useLoading(getPromptsResponse);
getPrompts({ type: '' });

onUnmounted(() => {
  unwatchPrompt();
  unwatchPatch();
});
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.training.training') }}</h1>

    <SForm ref="trainingForm" :field-schema="toTypedSchema(Workout.validation().omit({ exercises: true }))" p="0!">
      <SInput name="loop" :label="$t('admin.prompt.training.cycle')" />
      <SInput name="name" :label="$t('admin.prompt.training.name')" />
      <SForm
        ref="exerciseForms"
        v-for="(exercise, index) in exercises"
        :key="exercise.key"
        :field-schema="toTypedSchema(ExerciseValidation)"
        p="0!"
        mt-0.5rem
      >
        <ENewTrainingFields :prompts="getPromptsResponse.data?.data" />

        <template #submit-btn>
          <FListControls
            :disabled-add="index !== exercises.length - 1"
            :disabled-submit="index !== exercises.length - 1"
            @add="onadd"
            @remove="() => onremove(index)"
            @submit="onsubmit"
            :loading-submit="postWorkoutResponse.state.isLoading() || patchWorkoutResponse.state.isLoading()"
            mt-0.5rem
          />
        </template>
      </SForm>
      <!-- disable default submit -->
      <template #submit-btn />
    </SForm>
  </SComponentWrapper>
</template>
