<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { useAuthLink } from 'shared/lib/utils';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SVideo } from 'shared/ui/SVideo';

const props = defineProps<{
  video: BonusVideo;
}>();
const link = useAuthLink(props.video.linkUrl);
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ video.name }}</h2>
    <div>
      <SVideo v-if="link.data" :link-url="link.data.link" />
      <SNoResultsScreen v-else />
    </div>
  </div>
</template>
