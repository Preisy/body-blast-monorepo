<script setup lang="ts">
import { SProxyScroll } from 'shared/ui';

export interface Props {
  scrollBody?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div h-full flex flex-col overflow-x-hidden overflow-y-scroll pb-1.5rem>
    <div bg-primary>
      <slot name="header" />
    </div>
    <div h-full>
      <template v-if="scrollBody">
        <SProxyScroll h-full>
          <slot name="body" />
        </SProxyScroll>
      </template>
      <slot v-else name="body" />
    </div>
  </div>
</template>
