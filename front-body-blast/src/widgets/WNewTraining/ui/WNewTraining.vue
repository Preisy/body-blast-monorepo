<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { assign, omit, uniqueId } from 'lodash';
import { z } from 'zod';
import { FListControls } from 'features/FListControls';
import { FNewTrainingFields } from 'features/FNewTrainingFields';
import { useAdminPromptStore, useAdminWorkoutStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Workout } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

type Exercise = NonNullable<Workout['exercises']>[number];
const ExerciseValidation = Workout.validation().pick({ exercises: true }).shape.exercises.element;

export interface WNewTrainingProps {
  id: AppBaseEntity['id'];
  date: string; //ISO date, used for
  isEdit?: boolean;
  workoutId?: AppBaseEntity['id'];
  initValues?: Workout;
}

const props = defineProps<WNewTrainingProps>();
const emit = defineEmits<{
  edit: [];
  rejectEdit: [];
}>();

const { workoutList, postWorkout, patchWorkout } = useAdminWorkoutStore();
const { prompts, getPrompts } = useAdminPromptStore();

const exerciseForms = ref<Array<InstanceType<typeof SForm>>>();
const trainingForm = ref<InstanceType<typeof SForm>>();
const exercises = ref<Array<Partial<Exercise & { key: string }>>>(
  props.initValues && props.initValues.exercises
    ? props.initValues.exercises?.map((exercise) => ({ ...exercise, key: uniqueId('workout-') }))
    : [{ key: uniqueId('workout-') }],
);

const onsubmit = async () => {
  if (!exerciseForms.value) {
    console.error('No forms on page');
    return;
  }
  for (let i = 0; i < exerciseForms.value.length; i++) {
    const exerciseForm = exerciseForms.value[i];
    await exerciseForm.handleSubmit(
      (values: z.infer<typeof ExerciseValidation>) => {
        //find prompt with id. use prompt to pick photoLink and videoLink
        const { prompt } = values;

        const exercise: Omit<Exercise, keyof AppBaseEntity | 'workoutId'> = {
          name: values.name,
          pace: values.pace,
          photoLink: prompt.photoLink,
          promptType: prompt.type,
          videoLink: prompt.videoLink,
          repetitions: values.repetitions,
          restTime: values.restTime,
          trainerComment: values.trainerComment,
          sets: values.sets,
          weight: values.weight,
        };

        assign(exercises.value[i], exercise);
      },
      (err) => {
        console.error(err);
        return;
      },
    )();
  }

  await trainingForm.value?.handleSubmit(
    (values: z.infer<ReturnType<typeof Workout.validation>>) => {
      const workout: Omit<Workout, keyof AppBaseEntity | 'user'> = {
        name: values.name,
        comment: values.comment,
        date: props.date,
        exercises: exercises.value.map((training) => omit(training, ['key'])) as Exercise[],
        cycle: values.cycle,
        userId: props.id,
      };

      if (props.isEdit && props.workoutId) {
        useLoadingAction(workoutList.updateState, () => {
          if (props.workoutId) patchWorkout(props.workoutId, workout);
        });
        emit('edit');
      } else {
        useLoadingAction(workoutList.createState, () => postWorkout(workout));
      }
    },
    (err) => {
      console.error(err);
      return;
    },
  )();
};
const onadd = () => exercises.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => exercises.value.splice(index, 1);

useLoadingAction(prompts.state, () => getPrompts({ type: '', expanded: true }));
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <div flex flex-row>
      <h1>{{ $t('admin.prompt.training.training') }}</h1>
      <SBtn v-if="isEdit" :icon="symRoundedClose" ml-auto @click="emit('rejectEdit')" />
    </div>

    <SForm
      ref="trainingForm"
      :field-schema="toTypedSchema(Workout.validation().omit({ exercises: true }))"
      :init-values="isEdit ? initValues : {}"
      p="0!"
    >
      <SInput name="cycle" :label="$t('admin.prompt.training.cycle')" />
      <SInput name="name" :label="$t('admin.prompt.training.name')" />
      <SForm
        ref="exerciseForms"
        v-for="(exercise, index) in exercises"
        :key="exercise.key"
        :field-schema="toTypedSchema(ExerciseValidation)"
        :init-values="{
          ...exercise,
          prompt: { type: exercise.promptType },
        }"
        p="0!"
        mt-0.5rem
      >
        <FNewTrainingFields :prompts="prompts.data?.data" />

        <template #submit-btn>
          <FListControls
            :disabled-add="index !== exercises.length - 1"
            :disabled-submit="index !== exercises.length - 1"
            @add="onadd"
            @remove="() => onremove(index)"
            @submit="onsubmit"
            :loading-submit="workoutList.createState.isLoading() || workoutList.updateState.isLoading()"
            mt-0.5rem
          />
        </template>
      </SForm>
      <!-- disable default submit -->
      <template #submit-btn />
    </SForm>
  </SComponentWrapper>
</template>
