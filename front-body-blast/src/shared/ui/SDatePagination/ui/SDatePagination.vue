<script setup lang="ts">
import moment from 'moment';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

export interface SDatePaginationProps {
  modelValue: string; //Date. YYYY-MM-DD
  halfRange: number;
  offset: number;
}

const props = defineProps<SDatePaginationProps>();
const emit = defineEmits<{
  'update:model-value': [date: string];
  'update:offset': [page: number];
  needFetch: [from: string, to: string];
}>();

const today = moment().hour(0).minute(0).second(0).millisecond(0);
const localOffset = ref(props.offset);
const start = computed(() =>
  today
    .clone()
    .subtract(props.halfRange + 1, 'd')
    .add(localOffset.value * props.halfRange * 2, 'd'),
);
const lastReached = (date: string) => {
  const delta = moment(date)
    .subtract(localOffset.value * props.halfRange * 2, 'd')
    .diff(today, 'd');
  console.log(delta);
  if (Math.abs(delta) !== props.halfRange) return;

  if (delta > 0) {
    localOffset.value++;
    emit('update:offset', localOffset.value);
  } else {
    localOffset.value--;
    emit('update:offset', localOffset.value);
  }
  emit(
    'needFetch',
    start.value.format('YYYY-MM-DD'),
    start.value
      .clone()
      .add(2 * props.halfRange + 1, 'd')
      .format('YYYY-MM-DD'),
  );
};
</script>

<template>
  <SComponentWrapper h-full>
    <q-tab-panels
      :model-value="modelValue"
      @update:model-value="(newVal) => $emit('update:model-value', newVal as string)"
      @before-transition="lastReached"
      :swipeable="true"
      :animated="true"
      h-full
    >
      <q-tab-panel
        v-for="N in 2 * (halfRange + 1) - 1"
        :key="start.clone().add(N, 'd').format('YYYY-MM-DD')"
        :name="start.clone().add(N, 'd').format('YYYY-MM-DD')"
        h-full
      >
        <slot name="item" :date="start.clone().add(N, 'd')">
          <SNoResultsScreen />
        </slot>
      </q-tab-panel>
    </q-tab-panels>
  </SComponentWrapper>
</template>
