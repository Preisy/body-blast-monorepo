<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import moment, { Moment } from 'moment';
import { QDate } from 'quasar';
import { getUTC3Date } from 'shared/lib';
import { SNoResultsScreen, SComponentWrapper, SSplide, SSplideSlide } from 'shared/ui';

export interface SDatePaginationProps {
  modelValue: string; //Date. YYYY-MM-DD
  halfRange: number;
  page: number;
  borders: {
    startDate?: string;
    endDate?: string;
  };
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

  console.log(date.toISOString());
  console.log(props.borders.startDate);

  if (props.borders.startDate) {
    canDisplay =
      canDisplay && date.isSameOrAfter(moment(props.borders.startDate).utc(true).hour(0).minutes(0).seconds(1));
  }

  if (props.borders.endDate) {
    canDisplay = canDisplay && date.isSameOrBefore(moment(props.borders.endDate));
  }

  return canDisplay;
};

const delta = computed(() =>
  moment(props.modelValue)
    .subtract(localPage.value * props.halfRange * 2, 'd')
    .diff(today, 'd'),
);
const updateCheck = () => {
  if (!checkDateConstraints(moment(props.modelValue))) return;

  //Calendar handler
  setTimeout(() => {
    let slide = 1 + props.halfRange + delta.value;
    if (enabledSlidesBorders.value.length > 1) {
      slide -= enabledSlidesBorders.value[0];
    }

    splide.value?.go(slide);
  });

  //If not crossing the page -> no need to fetch
  if (Math.abs(delta.value) <= props.halfRange) {
    return;
  }

  //Updating page
  const localPageDelta = Math.floor((Math.abs(delta.value) + props.halfRange) / (2 * props.halfRange));
  if (delta.value > 0) {
    localPage.value += localPageDelta;
    emit('update:page', localPage.value);
  } else {
    localPage.value -= localPageDelta;
    emit('update:page', localPage.value);
  }

  //Fetching
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

onMounted(() => {
  //go to today slide
  let slide = props.halfRange + 1;
  // if startDate cuts off a part of page -> need to subtract
  if (enabledSlidesBorders.value.length > 1) {
    slide -= enabledSlidesBorders.value[0];
  }
  splide.value?.go(slide);
});
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
