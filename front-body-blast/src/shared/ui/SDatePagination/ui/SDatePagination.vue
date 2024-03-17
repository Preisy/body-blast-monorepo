<script setup lang="ts">
import moment from 'moment';
import { QDate, QTabPanels } from 'quasar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

export interface SDatePaginationProps {
  modelValue: string; //Date. YYYY-MM-DD
  halfRange: number;
  offset: number;
  options?: QDate['options']; //TODO:
}

const props = defineProps<SDatePaginationProps>();
const emit = defineEmits<{
  'update:model-value': [date: string];
  'update:offset': [page: number];
  needFetch: [from: string, to: string];
}>();

const tabPanels = ref<InstanceType<typeof QTabPanels>>();
const isAnimated = ref<boolean>(true);

const today = moment().hour(0).minute(0).second(0).millisecond(0);
const localOffset = ref(props.offset);
const start = computed(() =>
  today
    .clone()
    .subtract(props.halfRange + 1, 'd')
    .add(localOffset.value * props.halfRange * 2, 'd'),
);

const handleNewPart = () => {
  const delta = moment(props.modelValue)
    .subtract(localOffset.value * props.halfRange * 2, 'd')
    .diff(today, 'd');
  if (Math.abs(delta) < props.halfRange) return;

  const localOffsetDelta = Math.floor((Math.abs(delta) + props.halfRange) / (2 * props.halfRange));
  if (delta > 0) {
    localOffset.value += localOffsetDelta;
    emit('update:offset', localOffset.value);
  } else {
    localOffset.value -= localOffsetDelta;
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

const fixEdgeCase = () => handleNewPart();
watch(() => props.modelValue, handleNewPart); //need to handle if date changes through SCalendar
</script>

<template>
  <SComponentWrapper h-full>
    <q-tab-panels
      ref="tabPanels"
      :model-value="modelValue"
      @update:model-value="(newVal) => $emit('update:model-value', newVal as string)"
      v-touch-swipe.horizontal="fixEdgeCase"
      :swipeable="true"
      :animated="isAnimated"
      h-full
    >
      <q-tab-panel
        v-for="N in 2 * (halfRange + 1) - 1"
        :key="start.clone().add(N, 'd').format('YYYY-MM-DD')"
        :name="start.clone().add(N, 'd').format('YYYY-MM-DD')"
        h-full
        overflow-hidden
        p="0!"
      >
        <slot name="item" :date="start.clone().add(N, 'd')">
          <SNoResultsScreen />
        </slot>
      </q-tab-panel>
    </q-tab-panels>
  </SComponentWrapper>
</template>
