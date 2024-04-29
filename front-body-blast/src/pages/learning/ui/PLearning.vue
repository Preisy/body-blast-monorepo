<script setup lang="ts">
import { EVideo } from 'entities/learning/';
import { useLoadingAction } from 'shared/lib/loading';
import { SProxyScroll } from 'shared/ui/proxy-scroll';
import { useBonusVideoStore } from '..';
const { getVideos, videoList } = useBonusVideoStore();
const videos = computed(() => videoList.data?.data || []);
useLoadingAction(videoList, getVideos);
</script>

<template>
  <SProxyScroll>
    <EVideo v-for="video in videos" :video="video" :key="video.id" />
  </SProxyScroll>
</template>
