<script setup lang="ts">
import { ESelfControlItem, Diary } from 'entities/diary';

export interface ESelfControlListProps {
  week: string;
  slides: Array<Diary>;
}
defineProps<ESelfControlListProps>();
</script>

<template>
  <div mb-2rem h-full>
    <h1>{{ $t('admin.diary.selfControl') }} {{ week }}</h1>

    <div v-for="slide in slides" :key="slide.id" mt-1rem>
      <ESelfControlItem :diary="slide" />
    </div>
  </div>
</template>
