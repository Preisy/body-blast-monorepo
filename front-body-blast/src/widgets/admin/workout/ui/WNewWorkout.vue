<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { assign, omit, uniqueId } from 'lodash';
import { z } from 'zod';
import { FListControls } from 'features/list-controls';
import { FNewWorkoutFields } from 'features/new-workout-fields';
import { useAdminPromptStore, useAdminWorkoutStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Workout } from 'shared/api/workout';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/component-wrapper';
import { SForm } from 'shared/ui/form';
import { SInput } from 'shared/ui/inputs';

type Exercise = NonNullable<Workout['exercises']>[number];
const ExerciseValidation = Workout.validation().pick({ exercises: true }).shape.exercises.element;

export interface WNewWorkoutProps {
  id: AppBaseEntity['id'];
  date: string; //ISO date, used for
  isEdit?: boolean;
  workoutId?: AppBaseEntity['id'];
  initValues?: Workout;
}

const props = defineProps<WNewWorkoutProps>();
const emit = defineEmits<{
  edit: [];
  rejectEdit: [];
}>();

const { workoutList, postWorkout, patchWorkout } = useAdminWorkoutStore();
const { prompts, getPrompts } = useAdminPromptStore();

const exerciseForms = ref<Array<InstanceType<typeof SForm>>>();
const workoutForm = ref<InstanceType<typeof SForm>>();
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
      async (values: z.infer<typeof ExerciseValidation>) => {
        //find prompt with id. use prompt to pick photoLink and videoLink
        const { prompt } = values;
        if (!prompt.type) throw 'No prompt!';
        if (!prompt.photoLink || !prompt.videoLink) {
          const response = await getPrompts({ type: prompt.type });
          if (!response.data) {
            throw response.error;
          }
          const newPrompt = response.data.data[0];
          if (!newPrompt) throw 'No prompt!';
          prompt.photoLink = newPrompt.photoLink;
          prompt.videoLink = newPrompt.videoLink;
        }

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
        throw err;
      },
    )();
  }

  await workoutForm.value?.handleSubmit(
    (values: z.infer<ReturnType<typeof Workout.validation>>) => {
      const workout: Omit<Workout, keyof AppBaseEntity | 'user'> = {
        name: values.name,
        comment: values.comment,
        date: props.date,
        exercises: exercises.value.map((workout) => omit(workout, ['key'])) as Exercise[],
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
      throw err;
    },
  )();
};
const onadd = () => exercises.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => exercises.value.splice(index, 1);

if (!prompts.data?.data) useLoadingAction(prompts.state, () => getPrompts({ type: '', expanded: true }));
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <div flex flex-row>
      <h1>{{ $t('admin.prompt.workout.workout') }}</h1>
      <SBtn v-if="isEdit" :icon="symRoundedClose" ml-auto @click="emit('rejectEdit')" />
    </div>

    <SForm
      ref="workoutForm"
      :field-schema="toTypedSchema(Workout.validation().omit({ exercises: true }))"
      :init-values="isEdit ? initValues : {}"
      p="0!"
    >
      <SInput name="cycle" :label="$t('admin.prompt.workout.cycle')" />
      <SInput name="name" :label="$t('admin.prompt.workout.name')" />
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
        <FNewWorkoutFields :prompts="prompts.data?.data" />

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
