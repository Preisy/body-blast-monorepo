<script setup lang="ts">
import { EAdminPromptThumbnail } from 'entities/EAdminPromptThumbnail';
import { Prompt } from 'shared/api/admin';
import { SChooseInput, SInput } from 'shared/ui/inputs';

export interface ENewTrainingFieldsProps {
  prompts?: Array<Prompt>;
}
defineProps<ENewTrainingFieldsProps>();

const promptValue = ref<Prompt>();
const updateValue = (next: Prompt) => (promptValue.value = next);
</script>

<template>
  <SChooseInput
    v-if="prompts"
    name="_promptId"
    :label="$t('admin.prompt.training.type')"
    :model-value="promptValue?.id"
    :display="promptValue?.type"
  >
    <div v-for="prompt in prompts" :key="prompt.id" @click="() => updateValue(prompt)" mr-0.5rem>
      <EAdminPromptThumbnail :photo="prompt.photoLink" :type="prompt.type" />
    </div>
  </SChooseInput>

  <div grid grid-cols-2 grid-rows-3 gap-0.5rem>
    <SInput name="name" :label="$t('admin.prompt.training.name')" />
    <SInput name="weight" :label="$t('admin.prompt.training.weight')" />
    <SInput name="sets" :label="$t('admin.prompt.training.sets')" />
    <SInput name="repetitions" :label="$t('admin.prompt.training.repeats')" />
    <SInput name="restTime" :label="$t('admin.prompt.training.restTime')" />
    <SInput name="pace" :label="$t('admin.prompt.training.pace')" />
  </div>
  <SInput name="trainerComment" :label="$t('admin.prompt.training.commentary')" />
</template>
