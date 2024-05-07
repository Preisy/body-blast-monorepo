<script setup lang="ts">
import { useBonusVideoStore, ELearningVideo } from 'entities/learning';
import { useLoadingAction } from 'shared/lib/loading';

const { getVideos, videoList } = useBonusVideoStore();
const videos = computed(() => videoList.data?.data || []);
useLoadingAction(videoList, getVideos);
</script>

<template>
  <div>
    <ELearningVideo v-for="video in videos" :key="video.id" :video="video" />
  </div>
</template>
