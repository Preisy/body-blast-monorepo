<script setup lang="ts">
import moment from 'moment';
import { z } from 'zod';
import { EAthropometricsItem, EAthropometricsItemProps } from 'entities/user';
import { Anthropometry, useProfileStore } from 'shared/api/anthropometry';
import { AppBaseEntity } from 'shared/api/base';
import { useLoadingAction } from 'shared/lib/loading';
import { getUTC3Date, gtCreation, isEqualDates, isToday } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/calendar';
import { SDatePagination } from 'shared/ui/date-pagination';
import { SPaginationSliderProps } from 'shared/ui/pagination-slider';

interface AthropometricsSlide extends EAthropometricsItemProps {
  dateValue: string;
}

const date = ref(getUTC3Date().format('YYYY-MM-DD'));
const options = ref([moment().format('YYYY/MM/DD')]);

const { anthropometry, getAnthropometry, patchAnthropometry } = useProfileStore();
const anthropometryData = computed(() => anthropometry.data?.data);

const halfRange = ref(3);
const offset = ref(0);

if (!anthropometryData.value)
  useLoadingAction(anthropometry, () =>
    getAnthropometry({
      expanded: true,
      from: moment(date.value).subtract(halfRange.value, 'd').format('YYYY-MM-DD'),
      to: moment(date.value).add(halfRange.value, 'd').format('YYYY-MM-DD'),
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
watch(dates, (newDates) => options.value.push(...(newDates ?? [])), { immediate: true });

const onSubmit = (id: AppBaseEntity['id'], values: z.infer<ReturnType<typeof Anthropometry.validation>>) =>
  patchAnthropometry({ ...values, id });
</script>

<template>
  <div h-full>
    <SCalendar
      :model-value="date"
      @update:model-value="(newDate) => (date = newDate.split('/').join('-'))"
      :options="[...(dates || []), moment().format('YYYY/MM/DD')]"
    />

    <SDatePagination
      v-model="date"
      :half-range="halfRange"
      :offset="offset"
      @need-fetch="
        (from, to) =>
          getAnthropometry({
            expanded: true,
            from,
            to,
          })
      "
      :options="(date) => gtCreation(date)"
    >
      <template #item="{ date: dd }">
        <EAthropometricsItem
          v-if="anthropometrySlides && anthropometrySlides.find((slide) => isEqualDates(slide.dateValue, dd))"
          :profile="anthropometrySlides.find((slide) => isEqualDates(slide.dateValue, dd))!.profile"
          p="0!"
          :readonly="moment().diff(dd, 'd') > 3"
          @submit="onSubmit"
        />
      </template>
    </SDatePagination>
  </div>
</template>
