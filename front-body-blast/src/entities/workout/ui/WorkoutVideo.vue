<script setup lang="ts">
import { symRoundedPause, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';
import { SLoading, SBtn, SVideo } from 'shared/ui';

defineProps<{
  photoLink?: string;
  videoLink?: string;
  loading?: boolean;
}>();

const videoControl = ref<InstanceType<typeof SVideo>>();
const isModalShown = ref(false);
</script>

<template>
  <div relative w-full>
    <div relative>
      <div v-if="!loading && videoLink && photoLink">
        <SVideo
          ref="videoControl"
          :link-url="videoLink"
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
          :src="photoLink"
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

    <SBtn
      mt-0.5rem
      :icon="videoControl?.isPlaying ? symRoundedPause : symRoundedPlayArrow"
      bg="secondary!"
      @click="videoControl?.togglePlay"
    />
    <q-dialog v-model="isModalShown">
      <q-img :src="photoLink" @click="isModalShown = false" overflow="hidden!" rounded="1.5rem!" />
    </q-dialog>
  </div>
</template>
