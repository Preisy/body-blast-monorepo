<script setup lang="ts">
export interface EAdminPromptThumbnailProps {
  photoLink: string;
  type: string;
  loading?: boolean;
}
defineProps<EAdminPromptThumbnailProps>();
</script>

<template>
  <div flex flex-col gap-0.5rem p-1rem text-center text-bg>
    <template v-if="loading">
      <q-img :src="photoLink" h-4rem w-6.75rem rounded-0.25rem />
    </template>
    <template v-else>
      <q-circular-progress indeterminate rounded size="30px" color="secondary" class="q-ma-md" />
    </template>
    <p fw-800>{{ type }}</p>
  </div>
</template>
