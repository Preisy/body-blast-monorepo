<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { File, useFileStore } from 'shared/api/file';
import { useLoadingAction } from 'shared/lib/loading';
import { useSingleState } from 'shared/lib/utils';
import { SBtn } from 'shared/ui/btns';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

export interface SAuthVideoProps extends BonusVideo {}
const props = defineProps<SAuthVideoProps>();

const fileStore = useFileStore();
const videoFileName = props.linkUrl.split('/').pop() || '';
const state = ref(useSingleState<File.Response>());
useLoadingAction(state.value, () => fileStore.getFileByName({ filename: videoFileName }, state.value));
const videoLink = computed(() => (state.value.data ? URL.createObjectURL(state.value.data) : null));

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
  <div>
    <template v-if="videoLink">
      <video
        width="480"
        w-full
        border-rounded-4
        @click="toggleFullscreenAndControls"
        ref="video"
        @play="isPlaying = true"
        @pause="isPlaying = false"
      >
        <source :src="videoLink" type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
      <slot name="controlBtn">
        <SBtn :icon="isPlaying ? 'pause' : 'play_arrow'" ml-2 mt--8 @click="togglePlay" />
      </slot>
    </template>
    <SNoResultsScreen v-else />
  </div>
</template>
