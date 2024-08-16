<script setup lang="ts">
import { SComponentWrapper } from 'shared/ui';

export interface EProfileCardProps {
  header: string;
  describe: string;
  dark?: boolean;
}
defineProps<EProfileCardProps>();
</script>

<template>
  <SComponentWrapper
    class="e-minified-profile-card"
    :class="{ ' bg-primary text-bg': dark }"
    flex
    flex-row
    items-center
  >
    <div>
      <h1>{{ header }}</h1>
      <p>{{ describe }}</p>
    </div>
    <div ml-auto>
      <slot name="action" />
    </div>
  </SComponentWrapper>
</template>
