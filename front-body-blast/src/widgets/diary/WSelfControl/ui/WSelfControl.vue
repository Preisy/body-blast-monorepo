<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { omit } from 'lodash';
import moment from 'moment';
import { date, QTabPanel } from 'quasar';
import { EDiaryActivity } from 'entities/diary/EDiaryActivity';
import { EDiarySelfControlItem } from 'entities/diary/EDiarySelfControlItem';
import { Diary } from 'shared/api/diary';
import { SelfControl } from 'shared/api/selfControl';
import { SCalendar } from 'shared/ui/SCalendar';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
import { STabPanels } from 'shared/ui/STabPanels';

export interface WDiaryProps {
  slides: Array<SelfControl>;
}

const props = defineProps<WDiaryProps>();
const dates = props.slides.map((it) => it.date);
const modelDate = ref(dates[0]);
const updateModel = (newDate: string) => {
  modelDate.value = moment(newDate).format('YYYY-MM-DD');
};
</script>

<template>
  <div h-full>
    <SCalendar
      :model-value="moment(modelDate).format('YYYY/MM/DD')"
      @update:model-value="updateModel"
      :options="dates.map((date) => moment(date).format('YYYY/MM/DD'))"
    />
    <STabPanels v-model="modelDate">
      <q-tab-panel v-for="slide in slides" :name="slide.date" :key="slide.id">
        <SStructure relative>
          <SSplide
            :options="{
              direction: 'ttb',
              height: '15rem',
              fixedHeight: 'auto',
              arrows: false,
              omitEnd: true,
              gap: '2.5rem',
            }"
            class="[&>ul>li:nth-last-child(2)]:hidden!"
          >
            <SSplideSlide>
              <EDiarySelfControlItem v-bind="slide" />
            </SSplideSlide>

            <SSplideSlide>
              <EDiaryActivity v-bind="slide" />
            </SSplideSlide>
            <SSplideSlide>
              <div />
            </SSplideSlide>
          </SSplide>
        </SStructure>
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
