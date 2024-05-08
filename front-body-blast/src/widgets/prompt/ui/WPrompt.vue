<script setup lang="ts">
import {
  symRoundedDelete,
  symRoundedEdit,
  symRoundedPause,
  symRoundedPlayArrow,
} from '@quasar/extras/material-symbols-rounded';
import { useAuthLink } from 'entities/file';
import { Prompt, useAdminPromptStore } from 'entities/prompt';
import { AppBaseEntity } from 'shared/api';
import { SBtn } from 'shared/ui/btns';
import { SLoading } from 'shared/ui/loading';
import { SVideo } from 'shared/ui/video';
import PromptEditDialog from './PromptEditDialog.vue';

export interface WPromptsProps {
  prompt: Prompt;
}
const props = defineProps<WPromptsProps>();

const { deletePrompt } = useAdminPromptStore();

const { state: video } = useAuthLink(() => props.prompt.videoLink);
const { state: photo } = useAuthLink(() => props.prompt.photoLink);

const videoControl = ref<InstanceType<typeof SVideo>>();

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

const isModalShown = ref(false);
</script>

<template>
  <div>
    <h2 mb-0.75rem>{{ prompt.type }}</h2>
    <div relative>
      <div v-if="video.data && photo.data" overflow-hidden rounded-1rem>
        <SVideo
          ref="videoControl"
          :link-url="video.data.link"
          disable-btn
          absolute
          h-full
          w-full
          overflow-hidden
          top="50%"
          left="50%"
          translate="-50%"
        />
        <q-img
          @click="isModalShown = true"
          :src="photo.data.link"
          :class="{ 'opacity-0': videoControl?.isPlaying }"
          h-auto
          max-h-20rem
          w-full
          overflow-hidden
          rounded-1rem
        />
      </div>
      <template v-else>
        <SLoading />
      </template>
    </div>

    <div mx-5px mt-0.5rem flex flex-row gap-x-0.5rem>
      <SBtn
        :icon="videoControl?.isPlaying ? symRoundedPause : symRoundedPlayArrow"
        bg="bg!"
        @click="videoControl?.togglePlay"
      />
      <SBtn :icon="symRoundedEdit" bg="bg!" @click="() => openDialog(prompt)" />
      <SBtn :icon="symRoundedDelete" ml-auto @click="() => onDeleteClick(prompt.id)" />
    </div>

    <!-- onEditPopup -->
    <PromptEditDialog v-if="editPromptData" v-model="isEditDialogOpen" :prompt="editPromptData" />
    <q-dialog v-model="isModalShown">
      <q-img :src="photo.data?.link" @click="isModalShown = false" overflow="hidden!" rounded="1.5rem!" />
    </q-dialog>
  </div>
</template>
