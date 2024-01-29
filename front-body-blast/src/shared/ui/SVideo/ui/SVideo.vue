<script setup lang="ts">
import { SBtn } from 'shared/ui/btns';

export interface SVideoProps {
  linkUrl: string;
}
defineProps<SVideoProps>();

const video = ref<HTMLVideoElement>();
const isPlaying = ref(false);
const toggleFullscreenAndControls = () => {
  if (!video.value) return;

  video.value.requestFullscreen();
};
const play = () => {
  if (!video.value) return;

  video.value.play();
  isPlaying.value = true;
};
const pause = () => {
  if (!video.value) return;

  video.value.pause();
  isPlaying.value = false;
};
const togglePlay = () => {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
};
const handleFullscreenChange = () => {
  if (!video.value) return;

  video.value.controls = !video.value.controls;
};

defineExpose({
  play,
  togglePlay,
  pause,
  isPlaying,
  handleFullscreenChange,
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<template>
  <div>
    <a @click="toggleFullscreenAndControls">
      <video width="480" w-full border-rounded-4 ref="video" @play="isPlaying = true" @pause="isPlaying = false">
        <source :src="linkUrl" type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
    </a>
    <SBtn :icon="isPlaying ? 'pause' : 'play_arrow'" ml-2 mt--8 @click="togglePlay" />
  </div>
</template>
