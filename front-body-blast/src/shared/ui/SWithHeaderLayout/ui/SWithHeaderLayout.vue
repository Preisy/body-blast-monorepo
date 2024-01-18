<script setup lang="ts">
import { SProxyScroll } from 'shared/ui/SProxyScroll';
</script>

<template>
  <div h-full flex flex-col>
    <div bg-primary>
      <slot name="header" />
    </div>
    <div h-full>
      <SProxyScroll h-full>
        <slot name="body" />
      </SProxyScroll>
    </div>
  </div>
</template>
