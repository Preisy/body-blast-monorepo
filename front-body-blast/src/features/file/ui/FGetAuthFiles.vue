<script setup lang="ts">
import { useAuthLink } from 'entities/file';
import { SLoading } from 'shared/ui';

export interface Props {
  urls: string[];
  showLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), { showLoading: true });

const links = props.urls.map((url) => useAuthLink(() => url).state.value);
const isLoading = computed(() => !!links.find((link) => link.state.isLoading()));
const outputLinks = computed(() => links.map((link) => link.data?.link));

onUnmounted(() => links.forEach((link) => link.data?.destructor()));
</script>

<template>
  <div>
    <slot v-if="!isLoading" :links="outputLinks" :loading="isLoading" />
    <SLoading v-else-if="showLoading" />
  </div>
</template>
