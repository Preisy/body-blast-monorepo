<script setup lang="ts">
import { Diary } from 'shared/api/diary';
import { SBtnToggle } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';

export interface WSelfControlMonitoringProps {
  week: string;
  slides: Array<Diary>;
}
defineProps<WSelfControlMonitoringProps>();

const propsTotal = (diary: Diary) => diary.props?.reduce((prev, prop) => (prev += prop.value), 0);
const toggleOpts = [1, 2, 3, 4, 5].map((value) => ({
  value,
}));
</script>

<template>
  <div>
    <h1>{{ $t('admin.diary.selfControl') }} {{ week }}</h1>

    <div v-for="slide in slides" :key="slide.id">
      <div>
        <!-- TODO: Число цикла? -->
        <SReadonlyField
          :title="$t('admin.diary.mode') + slide.date"
          :value="$t('admin.diary.cycle') + 999"
          class="cycles"
        />
        <SReadonlyField :title="$t('admin.diary.total') + slide.date" :value="propsTotal(slide) ?? 0" class="total" />
      </div>
      <div class="popup">
        <SBtnToggle v-for="prop in slide.props" :key="prop.id" :model-value="prop.value" :options="toggleOpts" />
      </div>
    </div>
  </div>
</template>
