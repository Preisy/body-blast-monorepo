<script setup lang="ts">
import { EAdminPromptThumbnail } from 'entities/workout/EAdminPromptThumbnail';
import { Prompt } from 'shared/api/admin';
import { SChooseInput, SInput } from 'shared/ui/inputs';

export interface ENewTrainingFieldsProps {
  prompts?: Array<Prompt>;
}
const props = defineProps<ENewTrainingFieldsProps>();

//TODO: Use getPrompts with filter
const filterStr = ref('');
const filteredPrompts = computed(() => props.prompts?.filter((prompt) => prompt.type.includes(filterStr.value)));
</script>

<template>
  <SChooseInput
    v-if="prompts"
    name="prompt"
    :label="$t('admin.prompt.training.type')"
    :items="filteredPrompts ?? []"
    option-value="type"
    v-model:inner-input="filterStr"
  >
    <template #item="{ item, onclick }">
      <div @click="onclick">
        <EAdminPromptThumbnail :photo="item.photoLink" :type="item.type" />
      </div>
    </template>
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
