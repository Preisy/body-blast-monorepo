<script setup lang="ts">
import { SVideo } from 'shared/ui';
import { BonusVideo } from '..';

defineProps<{
  video: BonusVideo;
  link: string;
}>();
</script>

<template>
  <div w-full p-1.5rem>
    <h2 mb-4>{{ video.name }}</h2>
    <div>
      <SVideo :link-url="link" />
    </div>
  </div>
</template>
