<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { SBtn } from 'shared/ui/btns';

defineProps<BonusVideo>();

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

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ name }}</h2>
    <div>
      <video width="480" w-full border-rounded-4 @click="toggleFullscreenAndControls" ref="video">
        <source :src="linkUrl" type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
      <SBtn :icon="isPlaying ? 'pause' : 'play_arrow'" ml-2 mt--8 @click="togglePlay" />
    </div>
  </div>
</template>
