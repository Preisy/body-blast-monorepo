<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { SAuthVideo, useVideoLink } from 'shared/ui/SAuthVideo';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

const props = defineProps<{
  video: BonusVideo;
}>();
const link = computed(() => useVideoLink(props.video.linkUrl));

onUnmounted(() => link.value.data?.destructor());
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ video.name }}</h2>
    <div>
      <SAuthVideo v-if="link.data" :link-url="link.data.link" />
      <SNoResultsScreen v-else />
    </div>
  </div>
</template>
