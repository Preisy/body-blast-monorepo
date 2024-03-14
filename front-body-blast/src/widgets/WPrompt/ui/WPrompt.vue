<script setup lang="ts">
import {
  symRoundedDelete,
  symRoundedEdit,
  symRoundedPause,
  symRoundedPlayArrow,
} from '@quasar/extras/material-symbols-rounded';
import { FPromptEditDialog } from 'features/FPromptEditDialog';
import { Prompt, useAdminPromptStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { useAuthLink } from 'shared/lib/hooks';
import { SBtn } from 'shared/ui/btns';
import { SLoading } from 'shared/ui/SLoading';
import { SVideo } from 'shared/ui/SVideo';

export interface WPromptsProps {
  prompt: Prompt;
}
const props = defineProps<WPromptsProps>();

const { deletePrompt, prompts } = useAdminPromptStore();

const { state: video } = useAuthLink(props.prompt.videoLink);
const { state: photo } = useAuthLink(props.prompt.photoLink);

const videoControl = ref<InstanceType<typeof SVideo>>();

// Edit dialog data
const isEditDialogOpen = ref<boolean>(false);
const editPromptData = ref<Prompt>();
const openDialog = (data: Prompt) => {
  editPromptData.value = data;
  isEditDialogOpen.value = true;
};

const onDeleteClick = async (id: AppBaseEntity['id']) => {
  await deletePrompt({ id });

  if (prompts.deleteState.isSuccess()) {
    const index = prompts.data?.data.findIndex((prompt) => props.prompt.id === prompt.id);
    if (index) prompts.data?.data.splice(index, 1);
  }
};
</script>

<template>
  <div>
    <h2 mb-0.75rem>{{ prompt.type }}</h2>
    <div relative>
      <template v-if="video.data && photo.data">
        <q-img v-if="!videoControl?.isPlaying" :src="photo.data.link" absolute h-full w-full rounded-1rem />

        <SVideo ref="videoControl" :link-url="video.data.link" disable-btn />
      </template>
      <template v-else>
        <SLoading />
      </template>
    </div>

    <div mx-5px mt--1rem flex flex-row gap-x-0.5rem>
      <SBtn
        :icon="videoControl?.isPlaying ? symRoundedPause : symRoundedPlayArrow"
        bg="bg!"
        @click="videoControl?.togglePlay"
      />
      <SBtn :icon="symRoundedEdit" bg="bg!" @click="() => openDialog(prompt)" />
      <SBtn :icon="symRoundedDelete" ml-auto @click="() => onDeleteClick(prompt.id)" />
    </div>

    <!-- onEditPopup -->
    <FPromptEditDialog v-if="editPromptData" v-model="isEditDialogOpen" :prompt-data="editPromptData" />
  </div>
</template>
