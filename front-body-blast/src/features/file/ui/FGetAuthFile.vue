<script setup lang="ts">
import { useAuthLink } from 'entities/file';
import { SLoading } from 'shared/ui';

export interface Props {
  url: string;
  showLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), { showLoading: true });

const { state: link } = useAuthLink(() => props.url);

onUnmounted(() => link.value.data?.destructor());
</script>

<template>
  <div>
    <slot v-if="link.data" :link="link.data.link" :loading="link.state.isLoading()" />
    <SLoading v-else-if="props.showLoading" />
  </div>
</template>
