<script lang="ts" setup>
import { Diary } from 'shared/api/diary';
import { SInput } from 'shared/ui/inputs';

export interface EDiaryActivity {
  diary: Diary;
  readonly: boolean;
}
defineProps<EDiaryActivity>();
</script>

<template>
  <div>
    <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
    <SInput
      mb-2
      name="field"
      :label="$t('home.diary.activity.physical')"
      :readonly="readonly"
      :model-value="diary.activivty"
    />
    <SInput name="field" :label="$t('home.diary.activity.steps')" :readonly="readonly" :model-value="diary.steps" />
  </div>
</template>
