<script setup lang="ts">
import moment, { Moment } from 'moment';
import { z } from 'zod';
import { EAthropometricsItem, EAthropometricsItemProps } from 'entities/profile/EAthropometricsItem';
import { Anthropometry, useProfileStore } from 'shared/api/anthropometry';
import { useLoadingAction } from 'shared/lib/loading';
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

const { anthropometry, getAnthropometry, patchAnthropometry } = useProfileStore();
const anthropometryData = computed(() => anthropometry.data?.data);

if (!anthropometryData.value)
  useLoadingAction(anthropometry, () =>
    getAnthropometry({
      expanded: true,
      to: date.value.toISOString(),
      from: date.value.clone().subtract(2, 'weeks').toISOString(),
    }),
  );

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
const dates = computed(() => anthropometrySlides.value?.map((it) => moment(it.dateValue).format('YYYY/MM/DD')));

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
const onSubmit = (id: number, values: z.infer<ReturnType<typeof Anthropometry.validation>>) =>
  patchAnthropometry({ ...values, id });
</script>

<template>
  <div h-full>
    <SCalendar v-model="calendarDate" :options="dates" />

    <SPaginationSlider
      :slides="anthropometrySlides?.length ? anthropometrySlides : [{ name: 'no-results' }]"
      :lock="lock"
      v-model="slideIndex"
      @first-element="update('back')"
      @last-element="update('front')"
    >
      <EAthropometricsItem
        v-if="anthropometrySlides && anthropometrySlides[slideIndex]"
        :profile="anthropometrySlides[slideIndex].profile"
        p="0!"
        :readonly="!moment().isSame(date, 'week')"
        @submit="onSubmit"
      />
      <SNoResultsScreen v-else p-1.5rem />
    </SPaginationSlider>
  </div>
</template>
