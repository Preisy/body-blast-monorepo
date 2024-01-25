<script setup lang="ts">
import { BonusVideo } from 'shared/api/bonusVideo';
import { SAuthVideo } from 'shared/ui/SAuthVideo';

defineProps<BonusVideo>();
</script>

<template>
  <div w-full p-6>
    <h2 mb-4>{{ name }}</h2>
    <div>
      <SAuthVideo v-bind="$props" />
    </div>
  </div>
</template>
