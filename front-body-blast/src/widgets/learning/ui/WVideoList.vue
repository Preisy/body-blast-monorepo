<script setup lang="ts">
import { FGetAuthFile } from 'features/file';
import { useBonusVideoStore, ELearningVideo } from 'entities/learning';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui';

const { getVideos, videoList } = useBonusVideoStore();
const videos = computed(() => videoList.data?.data || []);
useLoadingAction(videoList, getVideos);
</script>

<template>
  <div>
    <FGetAuthFile v-for="video in videos" :key="video.id" :url="video.linkUrl">
      <template #default="{ link }">
        <ELearningVideo :video="video" :link="link" />
      </template>
    </FGetAuthFile>
    <SNoResultsScreen v-if="!videos.length" py-1.5rem />
  </div>
</template>
