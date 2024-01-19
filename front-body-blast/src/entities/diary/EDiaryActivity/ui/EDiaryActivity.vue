<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import moment from 'moment';
import { Diary } from 'shared/api/diary';
import { SelfControl } from 'shared/api/selfControl';
import { SInput } from 'shared/ui/SInput';

const componentProps = defineProps<SelfControl>();
const today = moment(); // Current date
// Item is editable, if passed less then 1 week
const isReadonly = computed(() => today.diff(moment(componentProps.date)) < 7);
</script>

<template>
  <div>
    <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
    <SInput
      mb-2
      name="field"
      :label="$t('home.diary.activity.physical')"
      :readonly="isReadonly"
      :model-value="() => sum"
    />
    <SInput name="field" :label="$t('home.diary.activity.steps')" :readonly="isReadonly" :model-value="() => steps" />
  </div>
</template>
