<script setup lang="ts">
import { ESelfControlSlide } from 'entities/diary/ESelfControlSlide';
import { Diary } from 'shared/api/diary';

export interface WSelfControlListProps {
  week: string;
  slides: Array<Diary>;
}
defineProps<WSelfControlListProps>();
</script>

<template>
  <div h-full>
    <h1>{{ $t('admin.diary.selfControl') }} {{ week }}</h1>

    <div v-for="slide in slides" :key="slide.id" mt-1rem>
      <ESelfControlSlide :diary="slide" />
    </div>
  </div>
</template>
