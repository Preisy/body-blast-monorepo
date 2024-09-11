<script setup lang="ts">
import { symRoundedPause, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';
import { SVideoWithPreview, SBtn } from 'shared/ui';

defineProps<{
  photoLink: string;
  videoLink: string;
}>();

const videoControl = ref<InstanceType<typeof SVideoWithPreview>>();
</script>

<template>
  <div relative w-full>
    <SVideoWithPreview ref="videoControl" :video-link="videoLink" :photo-link="photoLink" />

    <SBtn
      mt-0.5rem
      :icon="videoControl?.isPlaying ? symRoundedPause : symRoundedPlayArrow"
      bg="secondary!"
      @click="videoControl?.togglePlay"
    />
  </div>
</template>
