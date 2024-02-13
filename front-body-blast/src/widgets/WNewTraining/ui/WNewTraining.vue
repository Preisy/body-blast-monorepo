<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, omit, uniqueId } from 'lodash';
import { z } from 'zod';
import { FListControls } from 'features/FListControls';
import { FNewTrainingFields } from 'features/FNewTrainingFields';
import { AdminTraining, Exercise, useAdminPromptStore, useAdminTrainingStore, Training } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const props = defineProps<{
  date: string; //ISO date
}>();

const { id } = useRoute().params as { id: string };

const adminTrainingStore = useAdminTrainingStore();
const { prompts, getPrompts } = useAdminPromptStore();

const exercises = ref<Array<InstanceType<typeof SForm>>>();
const trainingForm = ref<InstanceType<typeof SForm>>();
const trainings = ref<Array<Partial<Exercise & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const onsubmit = async () => {
  if (!exercises.value) return;
  for (let i = 0; i < exercises.value.length; i++) {
    const exerciseForm = exercises.value[i];
    await exerciseForm.handleSubmit((values: z.infer<ReturnType<typeof Exercise.validation>>) => {
      //find prompt with id. use prompt to pick photoLink and videoLink
      const prompt = prompts.data?.data.find((prompt) => prompt.id === values._promptId);
      if (!prompt) {
        console.error('Could not find prompt with this id');
        return;
      }

      const exercise: Exercise = {
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

  await trainingForm.value?.handleSubmit((values: z.infer<ReturnType<typeof AdminTraining.validation>>) => {
    const training: Training = {
      name: values.name,
      comment: values.comment,
      date: props.date,
      exercises: trainings.value.map((training) => omit(training, ['key'])) as Exercise[], //TODO: fix
      loop: parseInt(values.loop),
      userId: parseInt(id),
    };
    adminTrainingStore.sendTraining(training);
  })();
};
const onadd = () => trainings.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => trainings.value.splice(index, 1);

useLoading(prompts);
getPrompts({ type: '', expanded: false });
</script>

<template>
  <SComponentWrapper h-full flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.training.training') }}</h1>

    <SForm ref="trainingForm" :field-schema="toTypedSchema(AdminTraining.validation())" p="0!">
      <SInput name="loop" :label="$t('admin.prompt.training.cycle')" />
      <SInput name="name" :label="$t('admin.prompt.training.name')" />
      <SInput name="comment" :label="$t('admin.prompt.training.commentary')" />
      <SForm
        ref="exercises"
        v-for="(training, index) in trainings"
        :key="training.key"
        :field-schema="toTypedSchema(Exercise.validation())"
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
