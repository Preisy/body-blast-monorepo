<script setup lang="ts">
import { useAuthLink } from 'shared/lib/hooks';

export interface EAdminPromptThumbnailProps {
  photo: string;
  type: string;
}
const props = defineProps<EAdminPromptThumbnailProps>();

const link = useAuthLink(props.photo);
</script>

<template>
  <div flex flex-col gap-0.5rem p-1rem text-center text-bg>
    <template v-if="link.data">
      <q-img :src="link.data.link" h-4rem w-6.75rem rounded-0.25rem />
    </template>
    <template v-else>
      <q-circular-progress indeterminate rounded size="50px" color="secondary" class="q-ma-md" />
    </template>
    <p fw-800>{{ type }}</p>
  </div>
</template>
