<script setup lang="ts">
import { WPromptCreation } from 'widgets/WPromptCreation';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <WPromptCreation />
    </SProxyScroll>
  </SStructure>
</template>
