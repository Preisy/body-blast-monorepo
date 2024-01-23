<script setup lang="ts">
import { WVideo } from 'widgets/learning/WVideo';
import { useBonusVideoStore } from 'shared/api/bonusVideo';
import { useLoadingAction } from 'shared/lib/loading';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
const learningStore = useBonusVideoStore();
const videos = computed(() => learningStore.videos.data?.data || []);
useLoadingAction(learningStore.videos, learningStore.getVideos);
</script>

<template>
  <SProxyScroll>
    <WVideo v-for="video in videos" v-bind="video" :key="video.id" />
  </SProxyScroll>
</template>
