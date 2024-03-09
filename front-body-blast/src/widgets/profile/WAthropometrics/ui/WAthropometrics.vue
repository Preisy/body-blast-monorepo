<script setup lang="ts">
import moment, { Moment } from 'moment';
import { EAthropometricsItem, EAthropometricsItemProps } from 'entities/profile/EAthropometricsItem';
import { useProfileStore } from 'shared/api/anthropometry';
import { useLoading } from 'shared/lib/loading';
import { isToday } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SPaginationSlider, SPaginationSliderProps } from 'shared/ui/SPaginationSlider';

interface AthropometricsSlide extends EAthropometricsItemProps {
  dateValue: string;
}

const slideIndex = ref(0);
const date = ref<Moment>(moment());
const calendarDate = computed(() => date.value.format('YYYY/MM/DD'));

const { anthropometry, getAnthropometry } = useProfileStore();
const anthropometryData = computed(() => anthropometry.data?.data);
useLoading(anthropometry);
if (!anthropometryData.value)
  getAnthropometry({
    expanded: true,
    to: date.value.toISOString(),
    from: date.value.clone().subtract(2, 'weeks').toISOString(),
  });

const anthropometrySlides = computed(
  () =>
    anthropometryData.value?.map<AthropometricsSlide & NonNullable<SPaginationSliderProps['slides']>[number]>(
      (anthropometry) => ({
        dateValue: anthropometry.createdAt,
        readonly: !isToday(anthropometry.createdAt),
        profile: anthropometry,
        name: anthropometry.createdAt,
      }),
    ),
);
const dates = computed(() => anthropometrySlides.value?.map((it) => it.dateValue));

const update = (direction: 'back' | 'front', createdAt: string = date.value.toISOString()) => {
  let to = moment(createdAt);
  let from = to.clone().subtract(2, 'w');

  if (direction === 'back') {
    to.subtract(2, 'w');
    from.subtract(2, 'w');
  } else {
    to.add(2, 'w');
    from.add(2, 'w');
  }

  date.value = to;
  return getAnthropometry({ from: from.toISOString(), to: to.toISOString() });
};
const lock = computed(() => anthropometry.state.isLoading());
</script>

<template>
  <div h-full>
    <SCalendar v-model="calendarDate" :options="dates" />

    <SPaginationSlider
      :slides="anthropometrySlides?.length ? anthropometrySlides : [{ name: 'no-results' }]"
      :lock="lock"
      v-model="slideIndex"
      @first-element="() => update('back')"
      @last-element="() => update('front')"
    >
      <EAthropometricsItem
        v-if="anthropometrySlides && anthropometrySlides[slideIndex]"
        :profile="anthropometrySlides[slideIndex].profile"
        p="0!"
        readonly
        pointer-events-none
        select-none
      />
      <SNoResultsScreen v-else p-1.5rem />
    </SPaginationSlider>
  </div>
</template>
