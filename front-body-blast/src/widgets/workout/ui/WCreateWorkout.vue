<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { cloneDeep, omit, uniqueId } from 'lodash';
import { FieldArray } from 'vee-validate';
import { z } from 'zod';
import { EAdminPromptThumbnail, useAdminPromptStore } from 'entities/prompt';
import { Workout, useAdminWorkoutStore } from 'entities/workout';
import { AppBaseEntity } from 'shared/api';
import { useLoadingAction } from 'shared/lib';
import { SListControls, SInput, SChooseInput, SForm, SBtn, SComponentWrapper } from 'shared/ui';

type Exercise = NonNullable<Workout['exercises']>[number];

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

const onsubmit = (values: z.infer<ReturnType<typeof Workout.validation>>) => {
  const workout = {
    ...values,
    userId: props.id,
    date: props.date,
    comment: undefined,
    exercises: values.exercises.map((ex) => ({
      ...omit(ex, 'prompt'),
      promptType: ex.prompt.type,
      photoLink: ex.prompt.photoLink,
      videoLink: ex.prompt.videoLink,
      workoutId: props.workoutId,
    })),
  };

  if (props.isEdit) {
    if (!props.workoutId) {
      throw new Error('workoutId is undefined');
    }

    useLoadingAction(workoutList.updateState, () => {
      if (props.workoutId) patchWorkout(props.workoutId, workout);
    });
    emit('edit');
  } else {
    useLoadingAction(workoutList.createState, () => postWorkout(workout));
  }
};

if (!prompts.data?.data) useLoadingAction(prompts.state, () => getPrompts({ type: '', expanded: true }));

const store = useAdminWorkoutStore();
const workoutSchema = toTypedSchema(Workout.validation());

const emptyExercise = {
  prompt: {},
  name: '',
  weight: undefined,
  sets: undefined,
  repetitions: '',
  restTime: undefined,
  pace: '',
  trainerComment: '',
} as Partial<Exercise>;
const emptyWorkout = {
  cycle: undefined,
  name: '',
  exercises: [cloneDeep(emptyExercise)],
} as Partial<Workout>;

onMounted(() => {
  if (props.isEdit) console.log(props.initValues);
});
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <div flex flex-row>
      <h1>{{ $t('admin.prompt.workout.workout') }}</h1>
      <SBtn v-if="isEdit" :icon="symRoundedClose" ml-auto @click="emit('rejectEdit')" />
    </div>

    <SForm
      ref="workoutForm"
      :field-schema="workoutSchema"
      :init-values="isEdit ? initValues : cloneDeep(emptyWorkout)"
      disable-submit-btn
      @submit="onsubmit"
      p="0!"
    >
      <SInput name="cycle" :label="$t('admin.prompt.workout.cycle')" />
      <SInput name="name" :label="$t('admin.prompt.workout.name')" />
      <FieldArray name="exercises" v-slot="{ fields, push, remove }">
        <div v-for="(field, idx) in fields" :key="field.key" mt-0.5rem>
          <SChooseInput
            v-if="promptsData"
            :name="`exercises[${idx}].prompt`"
            :label="$t('admin.prompt.workout.type')"
            :items="promptsData.map((prompt) => ({ ...prompt, key: uniqueId('prompt-') }))"
            option-value="type"
            @open="store.isPopupVisible = true"
            @close="store.isPopupVisible = false"
          >
            <template #item="{ item }">
              <EAdminPromptThumbnail :photo-link="item.photoLink" :type="item.type" />
            </template>
          </SChooseInput>

          <div class="grid-rows-[repeat(3,_auto)]" grid grid-cols-2 items-center gap-0.5rem py-0.5rem>
            <SInput :name="`exercises[${idx}].name`" :label="$t('admin.prompt.workout.name')" />
            <SInput :name="`exercises[${idx}].weight`" :label="$t('admin.prompt.workout.weight')" />
            <SInput :name="`exercises[${idx}].sets`" :label="$t('admin.prompt.workout.sets')" />
            <SInput :name="`exercises[${idx}].repetitions`" :label="$t('admin.prompt.workout.repeats')" />
            <SInput :name="`exercises[${idx}].restTime`" :label="$t('admin.prompt.workout.restTime')" />
            <SInput :name="`exercises[${idx}].pace`" :label="$t('admin.prompt.workout.pace')" />
          </div>
          <SInput :name="`exercises[${idx}].trainerComment`" :label="$t('admin.prompt.workout.commentary')" />

          <SListControls
            :disabled-add="idx !== fields.length - 1"
            :disabled-submit="idx !== fields.length - 1"
            @add="push(cloneDeep(emptyExercise))"
            @remove="
              remove(idx);
              if (fields.length == 0) push(cloneDeep(emptyExercise));
            "
            :loading-submit="workoutList.createState.isLoading() || workoutList.updateState.isLoading()"
            mt-0.5rem
          />
        </div>
      </FieldArray>
    </SForm>
  </SComponentWrapper>
</template>
