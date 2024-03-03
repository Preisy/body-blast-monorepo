<script lang="ts" setup>
import { Diary } from 'shared/api/diary';
import { SBtnToggle } from 'shared/ui/btns';

export interface EDiarySelfControlItem {
  diary: Diary;
  readonly: boolean;
}
const props = defineProps<EDiarySelfControlItem>();
const diaryProps = props.diary.props;

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];
</script>

<template>
  <h1 mb-4>{{ $t('home.diary.item.selfcontrol') }}</h1>

  <template v-for="prop of diaryProps" :key="prop.id">
    <p mb-2 mt-4>{{ prop.label }}</p>
    <SBtnToggle v-model="prop.value" :options="options" :readonly="readonly" />
  </template>
</template>
