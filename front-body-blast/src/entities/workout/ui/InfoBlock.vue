<script setup lang="ts">
import { SReadonlyField, SReadonlyFieldProps } from 'shared/ui';

defineProps<{
  cards: Array<SReadonlyFieldProps>;
}>();

//$t(`dashboard.workout.infoBlock.${prop}`)
</script>

<template>
  <div flex flex-row flex-wrap gap-0.5rem>
    <SReadonlyField v-for="card in cards" :key="card.title" v-bind="card" />
  </div>
</template>
