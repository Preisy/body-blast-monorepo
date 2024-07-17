<script setup lang="ts">
//TODO: fix, when backend refactored
// eslint-disable-next-line boundaries/element-types
import { useAuthLink } from 'entities/file';
import { SLoading } from 'shared/ui/loading';
import { SVideo } from 'shared/ui/video';
import { BonusVideo } from '..';

const props = defineProps<{
  video: BonusVideo;
}>();
const { state: link } = useAuthLink(props.video.linkUrl);
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ video.name }}</h2>
    <div>
      <SVideo v-if="link.data" :link-url="link.data.link" />
      <SLoading v-else />
    </div>
  </div>
</template>
