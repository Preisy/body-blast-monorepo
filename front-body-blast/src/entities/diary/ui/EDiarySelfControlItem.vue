<script lang="ts" setup>
import { SelfControl } from 'shared/api/selfControl';
import { SBtnToggle } from 'shared/ui/btns';

const props = defineProps<{ selfControl: SelfControl; readonly: boolean }>();
const selfControlProps = props.selfControl.props;

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

  <template v-for="prop of selfControlProps" :key="prop.id">
    <p mb-2 mt-4>{{ prop.label }}</p>
    <SBtnToggle v-model="prop.value" :options="options" :readonly="readonly" />
  </template>
</template>
