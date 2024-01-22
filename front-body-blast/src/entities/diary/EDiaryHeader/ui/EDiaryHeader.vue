<script setup lang="ts">
import { SelfControl } from 'shared/api/selfControl';
defineProps<SelfControl>();
const week = 0; //TODO: ???
</script>

<template>
  <div m--2 mb-0 border bg-primary p-6 text-bg>
    <p>{{ $t('home.diary.header.goalWeek') }} {{ week }}</p>
    <h1 mb-4>{{ sum }} шагов</h1>
    <p>{{ $t('home.diary.header.done') }}</p>
    <h1 mb-0 text-secondary>{{ steps }} шагов</h1>
  </div>
</template>
