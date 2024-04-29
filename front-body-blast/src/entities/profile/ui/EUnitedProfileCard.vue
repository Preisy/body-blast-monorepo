<script setup lang="ts">
import { SComponentWrapper } from 'shared/ui/component-wrapper';

export interface EUnitedProfileCardProps {
  header: string;
  describe: string;
  dark?: boolean;
}
defineProps<EUnitedProfileCardProps>();
</script>

<template>
  <SComponentWrapper class="s-united-profile-card" :class="{ ' bg-primary text-bg': dark }">
    <div mb-1rem>
      <h1>{{ header }}</h1>
      <p>{{ describe }}</p>
    </div>
    <div>
      <slot name="action" />
    </div>
  </SComponentWrapper>
</template>
