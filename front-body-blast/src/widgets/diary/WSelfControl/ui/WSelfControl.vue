<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import moment from 'moment';
import { QTabPanel } from 'quasar';
import { z } from 'zod';
import { EDiarySelfControlItem } from 'entities/diary/';
import { Diary, useDiaryStore } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
import { STabPanels } from 'shared/ui/STabPanels';

export interface WDiaryProps {
  slides: Array<Diary>;
}

const props = defineProps<WDiaryProps>();
const { patchDiary, patchDiaryResponse } = useDiaryStore();

const dates = props.slides.map((it) => it.date);
const modelDate = ref(dates[0]);
const updateModel = (newDate: string) => {
  modelDate.value = moment(newDate).format('YYYY-MM-DD');
};

const today = moment(); // Current date
const isReadonly = (date: string) => today.diff(moment(date), 'd') >= 7;

const activityValidation = Diary.validation().pick({ activity: true, steps: true });
const onActivitySubmit = (diary: Diary, values: z.infer<typeof activityValidation>) => {
  const id = diary.id;
  useLoadingAction(patchDiaryResponse, () => patchDiary(id, { ...values, props: diary.props }));
};
const onChangeSelfControl = (diary: Diary) => {
  useLoadingAction(patchDiaryResponse, () =>
    patchDiary(diary.id, { props: diary.props, activity: diary.activity, steps: diary.steps }),
  );
};
</script>

<template>
  <SComponentWrapper h-full>
    <SCalendar
      :model-value="moment(modelDate).format('YYYY/MM/DD')"
      @update:model-value="updateModel"
      :options="dates.map((date) => moment(date).format('YYYY/MM/DD'))"
    />
    <STabPanels v-model="modelDate">
      <q-tab-panel v-for="slide in slides" :name="slide.date" :key="slide.id">
        <SStructure px="0!" relative>
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
              <EDiarySelfControlItem :diary="slide" :readonly="isReadonly(slide.date)" />
              <div mt-1.5rem flex v-if="!isReadonly(slide.date)">
                <SBtn
                  :icon="symRoundedDone"
                  ml-auto
                  @click="() => onChangeSelfControl(slide)"
                  :loading="patchDiaryResponse.state.isLoading()"
                />
              </div>
            </SSplideSlide>

            <SSplideSlide>
              <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
              <SForm
                :readonly="isReadonly(slide.date)"
                :field-schema="toTypedSchema(activityValidation)"
                :init-values="slide"
                @submit="(values) => onActivitySubmit(slide, values)"
                :loading="patchDiaryResponse.state.isLoading()"
                p="0!"
              >
                <SInput mb-2 name="activity" :label="$t('home.diary.activity.physical')" />
                <SInput name="steps" :label="$t('home.diary.activity.steps')" />
              </SForm>
            </SSplideSlide>
          </SSplide>
        </SStructure>
      </q-tab-panel>
    </STabPanels>
  </SComponentWrapper>
</template>
