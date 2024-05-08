<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { assign, omit, uniqueId } from 'lodash';
import { z } from 'zod';
import { FGetAuthFile } from 'features/file';
import { EAdminPromptThumbnail, useAdminPromptStore } from 'entities/prompt';
import { Workout, useAdminWorkoutStore } from 'entities/workout';
import { AppBaseEntity } from 'shared/api';
import { useLoadingAction } from 'shared/lib';
import { SListControls, SInput, SChooseInput, SForm, SBtn, SComponentWrapper } from 'shared/ui';

type Exercise = NonNullable<Workout['exercises']>[number];
const ExerciseValidation = Workout.validation().pick({ exercises: true }).shape.exercises.element;

export interface WCreateWorkoutProps {
  id: AppBaseEntity['id'];
  date: string; //ISO date, used for
  isEdit?: boolean;
  workoutId?: AppBaseEntity['id'];
  initValues?: Workout;
}

const props = defineProps<WCreateWorkoutProps>();
const emit = defineEmits<{
  edit: [];
  rejectEdit: [];
}>();

const { workoutList, postWorkout, patchWorkout } = useAdminWorkoutStore();
const { prompts, getPrompts } = useAdminPromptStore();
const promptsData = computed(() => prompts.data?.data);

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

//TODO: Use getPrompts with filter
const filterStr = ref('');
const filteredPrompts = computed(
  () =>
    promptsData.value
      ?.filter((prompt) => prompt.type.includes(filterStr.value))
      .map((prompt) => ({ ...prompt, key: uniqueId('prompt-') })),
);
const store = useAdminWorkoutStore();
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
        <SChooseInput
          v-if="filteredPrompts"
          name="prompt"
          :label="$t('admin.prompt.workout.type')"
          :items="filteredPrompts"
          option-value="type"
          v-model:inner-input="filterStr"
          @open="store.isPopupVisible = true"
          @close="store.isPopupVisible = false"
        >
          <template #item="{ item }">
            <FGetAuthFile :url="item.photoLink">
              <template #default="{ link, loading }">
                <EAdminPromptThumbnail :photo-link="link" :loading="loading" :type="item.type" />
              </template>
            </FGetAuthFile>
          </template>
        </SChooseInput>

        <div class="grid-rows-[repeat(3,_auto)]" grid grid-cols-2 items-center gap-0.5rem>
          <SInput name="name" :label="$t('admin.prompt.workout.name')" />
          <SInput name="weight" :label="$t('admin.prompt.workout.weight')" />
          <SInput name="sets" :label="$t('admin.prompt.workout.sets')" />
          <SInput name="repetitions" :label="$t('admin.prompt.workout.repeats')" />
          <SInput name="restTime" :label="$t('admin.prompt.workout.restTime')" />
          <SInput name="pace" :label="$t('admin.prompt.workout.pace')" />
        </div>
        <SInput name="trainerComment" :label="$t('admin.prompt.workout.commentary')" />

        <template #submit-btn>
          <SListControls
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
