<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, omit, uniqueId } from 'lodash';
import { z } from 'zod';
import { FListControls } from 'features/FListControls';
import { FNewTrainingFields } from 'features/FNewTrainingFields';
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
}
const props = defineProps<WNewTrainingProps>();

const adminTrainingStore = useAdminWorkoutStore();
const { prompts, getPrompts } = useAdminPromptStore();

const exercises = ref<Array<InstanceType<typeof SForm>>>();
const trainingForm = ref<InstanceType<typeof SForm>>();
const trainings = ref<Array<Partial<Exercise & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const onsubmit = async () => {
  if (!exercises.value) return;
  for (let i = 0; i < exercises.value.length; i++) {
    const exerciseForm = exercises.value[i];
    await exerciseForm.handleSubmit((values: z.infer<typeof ExerciseValidation>) => {
      //find prompt with id. use prompt to pick photoLink and videoLink
      const prompt = prompts.data?.data.find((prompt) => prompt.id === values._promptId);
      if (!prompt) {
        console.error('Could not find prompt with this id');
        return;
      }

      const exercise: Omit<Exercise, keyof AppBaseEntity | 'workoutId'> = {
        name: values.name,
        pace: values.pace,
        photoLink: prompt.photoLink,
        videoLink: prompt.videoLink,
        repetitions: parseInt(values.repetitions),
        restTime: parseInt(values.restTime),
        sets: parseInt(values.sets),
        trainerComment: values.trainerComment,
        weight: parseInt(values.weight),
      };

      assign(trainings.value[i], exercise);
    })();
  }

  await trainingForm.value?.handleSubmit((values: z.infer<ReturnType<typeof Workout.validation>>) => {
    const workout: Omit<Workout, keyof AppBaseEntity | 'user'> = {
      name: values.name,
      comment: values.comment,
      date: props.date,
      exercises: trainings.value.map((training) => omit(training, ['key'])) as Exercise[], //TODO: fix
      loop: parseInt(values.loop),
      userId: props.id,
    };
    adminTrainingStore.postWorkout(workout);
  })();
};
const onadd = () => trainings.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => trainings.value.splice(index, 1);

useLoading(prompts);
getPrompts({ type: '' });
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.training.training') }}</h1>

    <SForm ref="trainingForm" :field-schema="toTypedSchema(Workout.validation())" p="0!">
      <SInput name="loop" :label="$t('admin.prompt.training.cycle')" />
      <SInput name="name" :label="$t('admin.prompt.training.name')" />
      <SInput name="comment" :label="$t('admin.prompt.training.commentary')" />
      <SForm
        ref="exercises"
        v-for="(training, index) in trainings"
        :key="training.key"
        :field-schema="toTypedSchema(ExerciseValidation)"
        p="0!"
        mt-0.5rem
      >
        <FNewTrainingFields :prompts="prompts.data?.data" />

        <template #submit-btn>
          <FListControls
            :disabled-add="index !== trainings.length - 1"
            :disabled-submit="index !== trainings.length - 1"
            @add="onadd"
            @remove="() => onremove(index)"
            @submit="onsubmit"
            mt-0.5rem
          />
        </template>
      </SForm>
      <!-- disable default submit -->
      <template #submit-btn />
    </SForm>
  </SComponentWrapper>
</template>
