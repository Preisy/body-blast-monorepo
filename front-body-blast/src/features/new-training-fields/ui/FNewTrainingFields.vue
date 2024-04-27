<script setup lang="ts">
import { uniqueId } from 'lodash';
import { EAdminPromptThumbnail } from 'entities/workout';
import { Prompt, useAdminWorkoutStore } from 'shared/api/admin';
import { SChooseInput, SInput } from 'shared/ui/inputs';

export interface ENewTrainingFieldsProps {
  prompts?: Array<Prompt>;
}
const props = defineProps<ENewTrainingFieldsProps>();

//TODO: Use getPrompts with filter
const filterStr = ref('');
const filteredPrompts = computed(
  () =>
    props.prompts
      ?.filter((prompt) => prompt.type.includes(filterStr.value))
      .map((prompt) => ({ ...prompt, key: uniqueId('prompt-') })),
);
const store = useAdminWorkoutStore();
</script>

<template>
  <SChooseInput
    v-if="filteredPrompts"
    name="prompt"
    :label="$t('admin.prompt.training.type')"
    :items="filteredPrompts"
    option-value="type"
    v-model:inner-input="filterStr"
    @open="store.isPopupVisible = true"
    @close="store.isPopupVisible = false"
  >
    <template #item="{ item }">
      <EAdminPromptThumbnail :photo="item.photoLink" :type="item.type" />
    </template>
  </SChooseInput>

  <div class="grid-rows-[repeat(3,_auto)]" grid grid-cols-2 items-center gap-0.5rem>
    <SInput name="name" :label="$t('admin.prompt.training.name')" />
    <SInput name="weight" :label="$t('admin.prompt.training.weight')" />
    <SInput name="sets" :label="$t('admin.prompt.training.sets')" />
    <SInput name="repetitions" :label="$t('admin.prompt.training.repeats')" />
    <SInput name="restTime" :label="$t('admin.prompt.training.restTime')" />
    <SInput name="pace" :label="$t('admin.prompt.training.pace')" />
  </div>
  <SInput name="trainerComment" :label="$t('admin.prompt.training.commentary')" />
</template>
