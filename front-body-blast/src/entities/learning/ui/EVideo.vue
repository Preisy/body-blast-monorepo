<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { useAuthLink } from 'shared/lib/hooks';
import { SLoading } from 'shared/ui/loading';
import { SVideo } from 'shared/ui/video';

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
