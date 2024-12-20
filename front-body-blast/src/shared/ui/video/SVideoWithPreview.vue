<script setup lang="ts">
// FIXME: will be fixed, when api ready
// eslint-disable-next-line boundaries/element-types
import { useAuthLink } from 'entities/file';
import { SLoading } from '../loading';
import SVideo from './SVideo.vue';

interface Props {
  videoLink: string;
  photoLink: string;
}

const videoControl = ref<InstanceType<typeof SVideo>>();

const props = defineProps<Props>();
const isModalShown = ref(false);

const { state: video } = useAuthLink(() => props.videoLink);
const { state: photo } = useAuthLink(() => props.photoLink);

defineExpose({
  play: () => videoControl.value?.play(),
  pause: () => videoControl.value?.pause(),
  togglePlay: () => videoControl.value?.togglePlay(),
  isPlaying: computed(() => videoControl.value?.isPlaying),
});
</script>

<template>
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
        :class="{ 'opacity-0 z--1': videoControl?.isPlaying }"
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

    <q-dialog v-model="isModalShown">
      <q-img :src="photo.data?.link" @click="isModalShown = false" overflow="hidden!" rounded="1.5rem!" />
    </q-dialog>
  </div>
</template>
