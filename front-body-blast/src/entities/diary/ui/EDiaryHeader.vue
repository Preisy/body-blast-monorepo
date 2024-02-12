<script setup lang="ts">
import { Diary } from 'shared/api/diary';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface EDiaryHeaderProps {
  diary: Diary;
}
defineProps<EDiaryHeaderProps>();
const week = 0; //TODO: ???
</script>

<template>
  <SComponentWrapper m--2 mb-0 border bg-primary p-2rem text-bg>
    <p>{{ $t('home.diary.header.goalWeek') }} {{ week }}</p>
    <h1 mb-4>{{ diary.sum ?? 0 }} шагов</h1>
    <p>{{ $t('home.diary.header.done') }}</p>
    <h1 mb-0 text-secondary>{{ diary.steps ?? 0 }} шагов</h1>
  </SComponentWrapper>
</template>
