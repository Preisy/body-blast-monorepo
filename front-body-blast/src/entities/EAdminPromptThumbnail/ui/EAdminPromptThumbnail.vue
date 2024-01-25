<script setup lang="ts">
import { SAuthImg } from 'shared/ui/SAuthImg';

export interface EAdminPromptThumbnailProps {
  photo: string;
  type: string;
}
defineProps<EAdminPromptThumbnailProps>();
</script>

<template>
  <div flex flex-col gap-0.5rem p-1rem text-center text-bg>
    <SAuthImg :src="photo" h-4rem w-6.75rem rounded-0.25rem />
    <p fw-800>{{ type }}</p>
  </div>
</template>
