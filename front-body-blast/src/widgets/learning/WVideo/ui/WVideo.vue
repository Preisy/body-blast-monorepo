<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { SAuthVideo } from 'shared/ui/SAuthVideo';

defineProps<BonusVideo>();
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ name }}</h2>
    <div>
      <SAuthVideo v-bind="$props" />
      <!-- <video width="480" w-full border-rounded-4 @click="toggleFullscreenAndControls" ref="video">
        <source :src="linkUrl" type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
      <SBtn :icon="isPlaying ? 'pause' : 'play_arrow'" ml-2 mt--8 @click="togglePlay" /> -->
    </div>
  </div>
</template>
