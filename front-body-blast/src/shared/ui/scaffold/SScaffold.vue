<script setup lang="ts">
import { SProxyScroll } from 'shared/ui';

export interface Props {
  scroll?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div h-full flex flex-col>
    <div bg-primary>
      <slot name="header" />
    </div>
    <div h-full>
      <template v-if="scroll">
        <SProxyScroll h-full>
          <slot name="body" />
        </SProxyScroll>
      </template>
      <slot v-else name="body" />
    </div>
  </div>
</template>
