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
  <SComponentWrapper class="e-profile-card" :class="{ ' bg-primary text-bg': dark }">
    <div mb-1rem>
      <h1>{{ header }}</h1>
      <p>{{ describe }}</p>
    </div>
    <div>
      <slot name="action" />
    </div>
  </SComponentWrapper>
</template>
