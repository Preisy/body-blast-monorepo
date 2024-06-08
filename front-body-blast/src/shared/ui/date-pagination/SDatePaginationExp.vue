<script setup lang="ts">
import moment, { Moment } from 'moment';
import { QDate } from 'quasar';
import { getUTC3Date } from 'shared/lib';
import { SNoResultsScreen, SComponentWrapper, SSplide, SSplideSlide } from 'shared/ui';

export interface SDatePaginationProps {
  modelValue: string; //Date. YYYY-MM-DD
  halfRange: number;
  page: number;
  options?: QDate['options']; //TODO:
  startDate?: string;
  endDate?: string;
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

const slides = computed(() =>
  new Array(2 * (props.halfRange + 1) + 1).fill(0).map((_, i) => start.value.clone().add(i, 'd')),
);

const enabledSlides = computed(() => slides.value.map(checkDateConstraints));

const enabledSlidesBorders = computed(() => {
  const reduced = enabledSlides.value.reduce<number[]>((acc, cur, i) => {
    if (cur != enabledSlides.value[i - 1]) acc.push(0);
    acc[acc.length - 1]++;
    return acc;
  }, []);
  return reduced;
});

const checkDateConstraints = (date: Moment) => {
  let canDisplay = true;
  date = date.utc(true).hour(0).minutes(0).seconds(0);

  if (props.startDate) {
    canDisplay = canDisplay && date.isSameOrAfter(moment(props.startDate).utc(true).hour(0).minutes(0).seconds(1));
  }

  if (props.endDate) {
    canDisplay = canDisplay && date.isSameOrBefore(moment(props.endDate));
  }

  return canDisplay;
};

const updateCheck = () => {
  if (!checkDateConstraints(moment(props.modelValue))) return;

  // calculate slide number
  // today's delta = 0
  // possible range: [-halfRange-1, halfRange+1]
  const delta = moment(props.modelValue)
    .subtract(localPage.value * props.halfRange * 2, 'd')
    .diff(today, 'd');

  if (Math.abs(delta) <= props.halfRange) {
    //TODO: fix calendar navigation
    // setTimeout(() => splide.value?.go(1 + props.halfRange + delta));
    return;
  }

  // debugger;
  const localPageDelta = Math.floor((Math.abs(delta) + props.halfRange) / (2 * props.halfRange));
  if (delta > 0) {
    localPage.value += localPageDelta;
    emit('update:page', localPage.value);
    setTimeout(() => splide.value?.go(2));
  } else {
    localPage.value -= localPageDelta;
    emit('update:page', localPage.value);
    // enabledSlidesBorders.value[1] - 3 -- i don't know why "3" is here
    setTimeout(
      () => splide.value?.go(enabledSlidesBorders.value[1] ? enabledSlidesBorders.value[1] - 3 : 2 * props.halfRange),
    );
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

watch(() => props.modelValue, updateCheck); //need to handle if date changes through SCalendar

//TODO: props.halfRange + 1 should be todaySlide(), which not implemented yet
onMounted(() => splide.value?.go(props.halfRange + 1));
console.log(enabledSlidesBorders.value);
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
          const offset = enabledSlidesBorders.length > 1 ? enabledSlidesBorders[0] : 0;
          const val = start.clone().add(newValue + offset, 'd');
          $emit('update:model-value', val.format('YYYY-MM-DD'));
        }
      "
      class="[&>.splide\_\_track]:h-full"
      h-full
    >
      <template v-for="(slide, i) in slides" :key="slide.format('YYYY-MM-DD')">
        <SSplideSlide v-if="enabledSlides[i]" :name="slide.format('YYYY-MM-DD')" h-full overflow-hidden p="0!">
          <slot v-if="i != 0 && i != slides.length - 1" name="item" :date="slide">
            <SNoResultsScreen />
          </slot>
          <div v-else h-full w-full flex items-center justify-center>
            <q-circular-progress indeterminate rounded size="50px" color="secondary" class="q-ma-md" />
          </div>
        </SSplideSlide>
      </template>
    </SSplide>
  </SComponentWrapper>
</template>
