<script setup lang="ts">
import { SBtn } from 'shared/ui';

export interface SVideoProps {
  linkUrl: string;
  disableBtn?: boolean;
  startVolume?: number; // 0 - 1
}
const props = withDefaults(defineProps<SVideoProps>(), {
  startVolume: 0.05,
});

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
  if (video.value) video.value.volume = props.startVolume;
});
</script>

<template>
  <div>
    <a @click="toggleFullscreenAndControls" block h-full w-full>
      <video
        ref="video"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        h-full
        w-full
        border-rounded-4
        object-cover
        class="[&[controls]]:object-contain"
      >
        <source :src="linkUrl" type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
    </a>
    <slot name="controlBtn">
      <SBtn v-show="!disableBtn" :icon="isPlaying ? 'pause' : 'play_arrow'" ml-2 mt--8 @click="togglePlay" />
    </slot>
  </div>
</template>
