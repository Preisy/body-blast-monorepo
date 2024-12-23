<script setup lang="ts">
// FIXME: will be fixed, when api ready
// eslint-disable-next-line boundaries/element-types
import { useAuthLink } from 'entities/file';
import { SLoading } from '../loading';

interface Props {
  photoLink: string;
  hidden?: boolean;
}

const props = defineProps<Props>();
const isModalShown = ref(false);

const { state: photo } = useAuthLink(() => props.photoLink);
</script>

<template>
  <div v-if="photo.data" overflow-hidden rounded-1rem>
    <q-img
      @click="isModalShown = true"
      :src="photo.data.link"
      :class="{ 'opacity-0 z--1': hidden }"
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
</template>
