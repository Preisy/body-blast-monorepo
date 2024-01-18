<script setup lang="ts">
import { date, QTabPanel } from 'quasar';
import { EAthropometricsItem, EAthropometricsItemProps } from 'entities/profile/EAthropometricsItem';
import { SCalendar } from 'shared/ui/SCalendar';
import { STabPanels } from 'shared/ui/STabPanels';
const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
const panel = ref(today);
export interface WAthropometricsSlide extends EAthropometricsItemProps {
  dateValue: string;
}
export interface WAthropometricsProps {
  slides: WAthropometricsSlide[];
}

const props = defineProps<WAthropometricsProps>();
const dates = props.slides.map((it) => it.dateValue);
</script>

<template>
  <div h-full>
    <SCalendar v-model="panel" :options="dates" />
    <STabPanels v-model="panel" animated swipeable infinite static mx--2 class="[&_.q-tab-panel]:(p-2)" h-full>
      <q-tab-panel v-for="slide in slides" :name="slide.dateValue" :key="slide.dateValue">
        <EAthropometricsItem :profile="slide.profile" :readonly="slide.readonly" :date-value="slide.dateValue" />
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
