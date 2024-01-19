<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import moment from 'moment';
import { Diary } from 'shared/api/diary';
import { SelfControl } from 'shared/api/selfControl';
import { SBtnToggle } from 'shared/ui/btns';

const componentProps = defineProps<SelfControl>();
const props = componentProps.props;

const today = moment(); // Current date
// Item is editable, if passed less then 1 week
const isReadonly = computed(() => today.diff(moment(componentProps.date)) < 7);

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

  <template v-for="prop of props" :key="prop.id">
    <p mb-2 mt-4>{{ prop.label }}</p>
    <SBtnToggle :model-value="prop.value" :options="options" :readonly="isReadonly" />
  </template>

  <!-- <template v-if="sleep">
    <p mb-2 mt-4>{{ $t('home.diary.item.sleep') }}</p>
    <SBtnToggle v-model="sleepRef" :options="options" :readonly="readonly" />
  </template>
   -->
</template>
