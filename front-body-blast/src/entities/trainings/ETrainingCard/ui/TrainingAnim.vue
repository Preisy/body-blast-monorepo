<script setup lang="ts">
import { symRoundedPause, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';
import { useAuthLink } from 'shared/lib/hooks';
import { SBtn } from 'shared/ui/btns';
import { SLoading } from 'shared/ui/SLoading';
import { SVideo } from 'shared/ui/SVideo';

const props = defineProps<{
  photoLink: string;
  videoLink: string;
}>();

const { state: video } = useAuthLink(() => props.videoLink);
const { state: photo } = useAuthLink(() => props.photoLink);

const videoControl = ref<InstanceType<typeof SVideo>>();
const isModalShown = ref(false);
</script>

<template>
  <div relative w-full>
    <div relative>
      <div v-if="video.data && photo.data">
        <SVideo
          ref="videoControl"
          :link-url="video.data.link"
          :class="{ 'z-1': videoControl?.isPlaying }"
          disable-btn
          absolute
          w-full
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
      <q-img
        :src="photo.data?.link"
        @click="isModalShown = false"
        overflow="hidden!"
        rounded="1.5rem!"
        h="90%"
        w="90%"
      />
    </q-dialog>
  </div>
</template>
