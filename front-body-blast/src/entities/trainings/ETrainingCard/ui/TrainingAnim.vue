<script setup lang="ts">
import { symRoundedPause, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';
import { useAuthLink } from 'shared/lib/hooks';
import { SBtn } from 'shared/ui/btns';
import { SVideo } from 'shared/ui/SVideo';

const props = defineProps<{
  photoLink: string;
  videoLink: string;
}>();

const { state: video } = useAuthLink(props.videoLink);
const { state: photo } = useAuthLink(props.photoLink);

const videoControl = ref<InstanceType<typeof SVideo>>();
</script>

<template>
  <div relative w-full>
    <div relative>
      <template v-if="video.data && photo.data">
        <q-img v-if="!videoControl?.isPlaying" :src="photo.data.link" absolute h-full w-full rounded-1rem />

        <SVideo ref="videoControl" :link-url="video.data.link">
          <template #controlBtn> <div /> </template>
        </SVideo>
      </template>
      <template v-else>
        <q-circular-progress indeterminate rounded size="50px" color="secondary" class="q-ma-md" />
      </template>
    </div>

    <SBtn
      mt-0.5rem
      :icon="videoControl?.isPlaying ? symRoundedPause : symRoundedPlayArrow"
      bg="secondary!"
      @click="videoControl?.togglePlay"
    />
  </div>
</template>
