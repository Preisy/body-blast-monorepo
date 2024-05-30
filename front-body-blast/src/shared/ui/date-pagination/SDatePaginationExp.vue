<script setup lang="ts">
import moment from 'moment';
import { QDate } from 'quasar';
import { getUTC3Date } from 'shared/lib';
import { SNoResultsScreen, SComponentWrapper, SSplide, SSplideSlide } from 'shared/ui';

export interface SDatePaginationProps {
  modelValue: string; //Date. YYYY-MM-DD
  halfRange: number;
  page: number;
  options?: QDate['options']; //TODO:
}

const props = defineProps<SDatePaginationProps>();
const emit = defineEmits<{
  'update:model-value': [date: string];
  'update:page': [page: number];
  needFetch: [from: string, to: string];
}>();

// const tabPanels = ref<InstanceType<typeof QTabPanels>>();
const splide = ref<InstanceType<typeof SSplide>>();

const today = getUTC3Date().hour(0).minute(0).second(0).millisecond(0);
const localPage = ref(props.page);
const localValue = ref(0);
const start = computed(() =>
  today
    .clone()
    .subtract(props.halfRange + 1, 'd')
    .add(localPage.value * props.halfRange * 2, 'd'),
);

// "update function"
// on each modelValue change it checks if we need to fetch new data
// aka "go to next page"
const updateCheck = () => {
  // calculate slide number
  // today's delta = 0
  // possible range: [-halfRange-1, halfRange+1]
  const delta = moment(props.modelValue)
    .subtract(localPage.value * props.halfRange * 2, 'd')
    .diff(today, 'd');

  if (Math.abs(delta) <= props.halfRange) {
    setTimeout(() => splide.value?.go(1 + props.halfRange + delta));
    return;
  }

  const localPageDelta = Math.floor((Math.abs(delta) + props.halfRange) / (2 * props.halfRange));
  if (delta > 0) {
    localPage.value += localPageDelta;
    emit('update:page', localPage.value);
    setTimeout(() => splide.value?.go(2));
  } else {
    localPage.value -= localPageDelta;
    emit('update:page', localPage.value);
    setTimeout(() => splide.value?.go(2 * props.halfRange));
  }
  emit(
    'needFetch',
    start.value.format('YYYY-MM-DD'),
    start.value
      .clone()
      .add(2 * (props.halfRange + 1), 'd')
      .format('YYYY-MM-DD'),
  );
};

watch(() => props.modelValue, updateCheck); //need to handle if date changes through SCalendakr
onMounted(() => splide.value?.go(props.halfRange + 1));
</script>

<template>
  <SComponentWrapper h-full>
    <SSplide
      ref="splide"
      :options="{ direction: 'ltr', pagination: false, perMove: 1, perPage: 1 }"
      @splide:moved="
        ({ newValue }) => {
          if (localValue == newValue) return;
          localValue = newValue;
          const val = start.clone().add(newValue, 'd').format('YYYY-MM-DD');
          $emit('update:model-value', val);
        }
      "
      class="[&>.splide\_\_track]:h-full"
      h-full
    >
      <SSplideSlide :name="start.clone().format('YYYY-MM-DD')" h-full overflow-hidden p="0!">
        <div h-full w-full flex items-center justify-center>
          <q-circular-progress indeterminate rounded size="50px" color="secondary" class="q-ma-md" />
        </div>
      </SSplideSlide>
      <SSplideSlide
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
      </SSplideSlide>
      <SSplideSlide
        :name="
          start
            .clone()
            .add(2 * (halfRange + 1), 'd')
            .format('YYYY-MM-DD')
        "
        h-full
        overflow-hidden
        p="0!"
      >
        <div h-full w-full flex items-center justify-center>
          <q-circular-progress indeterminate rounded size="50px" color="secondary" class="q-ma-md" />
        </div>
      </SSplideSlide>
    </SSplide>
  </SComponentWrapper>
</template>
