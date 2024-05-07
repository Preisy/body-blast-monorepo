<script setup lang="ts">
import { useBonusVideoStore, ELearningVideo } from 'entities/learning';
import { useLoadingAction } from 'shared/lib/loading';

const { getVideos, videoList } = useBonusVideoStore();
const videos = computed(() => videoList.data?.data || []);
useLoadingAction(videoList, getVideos);
</script>

<template>
  <div>
    <ELearningVideo v-for="video in videos" :video="video" :key="video.id" />
  </div>
</template>
