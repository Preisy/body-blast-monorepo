<script setup lang="ts">
import { SComponentWrapper } from 'shared/ui/component-wrapper';

export interface EDiaryHeaderProps {
  stepsGoal: number;
  stepsSum: number;
  week: string;
}
defineProps<EDiaryHeaderProps>();
</script>

<template>
  <SComponentWrapper m--2 mb-0 border bg-primary p-2rem text-bg>
    <p>{{ $t('home.diary.header.goalWeek') }} {{ week }}</p>
    <h1 mb-4>{{ stepsGoal ?? $t('global.error') }} {{ $t('home.diary.header.steps') }}</h1>
    <p>{{ $t('home.diary.header.done') }}</p>
    <h1 mb-0 text-secondary>{{ stepsSum ?? $t('global.error') }} {{ $t('home.diary.header.steps') }}</h1>
  </SComponentWrapper>
</template>
