<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import moment from 'moment';
import { z } from 'zod';
import { EDiarySelfControlItem } from 'entities/diary/EDiarySelfControlItem';
import { Diary, useDiaryStore } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { getUTC3Date, isEqualDates } from 'shared/lib/utils';
import { SInput } from 'shared/ui/inputs';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SDatePagination } from 'shared/ui/SDatePagination';
import { SForm } from 'shared/ui/SForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const today = getUTC3Date(); // Current date

const emit = defineEmits<{
  'update:date': [date: string];
}>();

const { patchDiary, diaryList, getDiary } = useDiaryStore();
const diaryData = computed(() => diaryList.data?.data);

const dates = diaryData.value?.map((it) => it.date);
const modelDate = ref(today.format('YYYY-MM-DD'));
const updateModel = (newDate: string) => {
  if (!newDate) return;
  modelDate.value = moment(newDate.split('/').join('-')).format('YYYY-MM-DD');

  emit('update:date', modelDate.value);
};

const isReadonly = (date: string) => today.diff(moment(date), 'd') >= 7;

const activityValidation = Diary.validation().pick({ activity: true, steps: true });
const onSubmit = (diary: Diary, values: z.infer<typeof activityValidation>) => {
  useLoadingAction(diaryList.updateState, () =>
    patchDiary(diary.id, { ...values, props: diary.props?.filter((prop) => prop.value) }),
  );
};

const offset = ref(0);
const halfRange = ref(7);
</script>

<template>
  <SComponentWrapper h-full>
    <SCalendar
      :model-value="moment(modelDate).format('YYYY/MM/DD')"
      @update:model-value="updateModel"
      :options="dates?.map((date) => moment(date).format('YYYY/MM/DD'))"
    />
    <SDatePagination
      :model-value="modelDate"
      @update:model-value="
        (newDate) => {
          modelDate = newDate;
          emit('update:date', newDate);
        }
      "
      :offset="offset"
      :half-range="halfRange"
      @need-fetch="(from, to) => getDiary({ from, to, expanded: true })"
      p="0!"
    >
      <template #item="{ date: dd }">
        <SStructure v-if="diaryData && diaryData.find((item) => isEqualDates(item.date, dd))" px="0!" relative>
          <SSplide
            :options="{
              direction: 'ttb',
              height: '15rem',
              fixedHeight: 'auto',
              arrows: false,
              omitEnd: true,
              gap: '2.5rem',
            }"
          >
            <SSplideSlide>
              <EDiarySelfControlItem
                :diary="diaryData.find((item) => isEqualDates(item.date, dd))!"
                :readonly="isReadonly(diaryData.find((item) => isEqualDates(item.date, dd))!.date)"
              />
            </SSplideSlide>

            <SSplideSlide>
              <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
              <SForm
                :readonly="isReadonly(diaryData.find((item) => isEqualDates(item.date, dd))!.date)"
                :field-schema="toTypedSchema(activityValidation)"
                :init-values="diaryData.find((item) => isEqualDates(item.date, dd))!"
                @submit="(values) => onSubmit(diaryData!.find((item) => isEqualDates(item.date, dd))!, values)"
                :loading="diaryList.updateState.isLoading()"
                p="0!"
              >
                <SInput mb-2 name="activity" :label="$t('home.diary.activity.physical')" />
                <SInput name="steps" :label="$t('home.diary.activity.steps')" />
              </SForm>
            </SSplideSlide>
          </SSplide>
        </SStructure>
      </template>
    </SDatePagination>
  </SComponentWrapper>
</template>
