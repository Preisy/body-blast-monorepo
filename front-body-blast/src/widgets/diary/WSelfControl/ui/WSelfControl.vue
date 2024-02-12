<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import moment from 'moment';
import { QTabPanel } from 'quasar';
import { EDiaryActivity, EDiarySelfControlItem } from 'entities/diary/';
import { Diary } from 'shared/api/diary';
import { SBtn } from 'shared/ui/btns';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
import { STabPanels } from 'shared/ui/STabPanels';

export interface WDiaryProps {
  slides: Array<Diary>;
}

const props = defineProps<WDiaryProps>();
const dates = props.slides.map((it) => it.date);
const modelDate = ref(dates[0]);
const updateModel = (newDate: string) => {
  modelDate.value = moment(newDate).format('YYYY-MM-DD');
};

const today = moment(); // Current date
const isReadonly = (date: string) => today.diff(moment(date), 'd') >= 7;
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
                <SBtn :icon="symRoundedDone" ml-auto />
              </div>
            </SSplideSlide>

            <SSplideSlide>
              <EDiaryActivity :diary="slide" :readonly="isReadonly(slide.date)" />
              <div mt-0.5rem flex v-if="!isReadonly(slide.date)">
                <SBtn :icon="symRoundedDone" ml-auto />
              </div>
            </SSplideSlide>
          </SSplide>
        </SStructure>
      </q-tab-panel>
    </STabPanels>
  </SComponentWrapper>
</template>
