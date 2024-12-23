<script setup lang="ts">
import {
  symRoundedDelete,
  symRoundedEdit,
  symRoundedPause,
  symRoundedPlayArrow,
} from '@quasar/extras/material-symbols-rounded';
import { Prompt, useAdminPromptStore } from 'entities/prompt';
import { AppBaseEntity } from 'shared/api';
import { SBtn, SVideoWithPreview } from 'shared/ui';
import PromptEditDialog from './PromptEditDialog.vue';

export interface WPromptsProps {
  prompt: Prompt;
}
defineProps<WPromptsProps>();

const { deletePrompt } = useAdminPromptStore();

// Edit dialog data
const isEditDialogOpen = ref<boolean>(false);
const editPromptData = ref<Prompt>();
const openDialog = (data: Prompt) => {
  editPromptData.value = data;
  isEditDialogOpen.value = true;
};

const onDeleteClick = async (id: AppBaseEntity['id']) => {
  deletePrompt({ id });
};

const videoControl = ref<InstanceType<typeof SVideoWithPreview>>();
</script>

<template>
  <div>
    <h2 mb-0.75rem>{{ prompt.type }}</h2>

    <SVideoWithPreview ref="videoControl" :video-link="prompt.videoLink" :photo-link="prompt.photoLink" />

    <div mx-5px mt-0.5rem flex flex-row gap-x-0.5rem>
      <SBtn
        v-if="prompt.videoLink"
        :icon="videoControl?.isPlaying ? symRoundedPause : symRoundedPlayArrow"
        bg="bg!"
        @click="videoControl?.togglePlay"
      />
      <SBtn :icon="symRoundedEdit" bg="bg!" @click="() => openDialog(prompt)" />
      <SBtn :icon="symRoundedDelete" ml-auto @click="() => onDeleteClick(prompt.id)" />
    </div>

    <!-- onEditPopup -->
    <PromptEditDialog v-if="editPromptData" v-model="isEditDialogOpen" :prompt="editPromptData" />
  </div>
</template>
