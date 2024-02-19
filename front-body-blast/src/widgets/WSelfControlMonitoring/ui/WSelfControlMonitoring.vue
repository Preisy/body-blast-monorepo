<script setup lang="ts">
import moment from 'moment';
import { Diary } from 'shared/api/diary';
import { SBtnToggle } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';

export interface WSelfControlMonitoringProps {
  data: Diary;
}
const props = defineProps<WSelfControlMonitoringProps>();

const toWeekRange = (dayString: string) => {
  const date = moment(dayString);
  const dayNumOfWeek = date.day();
  const begin = parseInt(date.format('DD')) - dayNumOfWeek;
  const end = parseInt(date.format('DD')) + dayNumOfWeek;
  return `${begin}-${end}`;
};
const propsTotal = computed(() => props.data.props?.reduce((prev, prop) => (prev += prop.value), 0));
const toggleOpts = [1, 2, 3, 4, 5].map((value) => ({
  value,
}));
</script>

<template>
  <div>
    <h1>{{ $t('admin.diary.selfControl') }} {{ toWeekRange(data.date) }}</h1>

    <div>
      <!-- TODO: Число цикла? -->
      <SReadonlyField
        :title="$t('admin.diary.mode') + data.date"
        :value="$t('admin.diary.cycle') + 999"
        class="cycles"
      />
      <SReadonlyField :title="$t('admin.diary.total') + data.date" :value="propsTotal ?? 0" class="total" />
    </div>
    <div class="appendance">
      <SBtnToggle v-for="prop in data.props" :key="prop.id" :model-value="prop.value" :options="toggleOpts" />
    </div>
  </div>
</template>
