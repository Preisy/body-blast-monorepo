<script setup lang="ts">
import { useAuthLink } from 'entities/file';
import { SLoading } from 'shared/ui';

export interface Props {
  urls: string[];
  showLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), { showLoading: true });

const links = props.urls.map((url) => useAuthLink(() => url).state.value);

onUnmounted(() => links.forEach((link) => link.data?.destructor()));
</script>

<template>
  <div>
    <slot
      v-if="links.find((link) => link.state.isLoading())"
      :links="links.map((link) => link.data!.link)"
      :loading="!!links.find((link) => link.state.isLoading())"
    />
    <SLoading v-else-if="showLoading" />
  </div>
</template>
