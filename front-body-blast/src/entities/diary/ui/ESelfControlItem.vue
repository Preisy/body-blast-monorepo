<script setup lang="ts">
import moment from 'moment';
import { QExpansionItem } from 'quasar';
import { SBtnToggle, SReadonlyField } from 'shared/ui';
import { Diary } from '..';

export interface ESelfControlSlideProps {
  diary: Diary;
}
defineProps<ESelfControlSlideProps>();

const propsTotal = (diary: Diary) => diary.props?.reduce((prev, prop) => (prev += prop.value), 0);
const toggleOpts = [1, 2, 3, 4, 5].map((value) => ({
  value,
  label: value.toString(),
}));

const ISODateToDDMM = (ISOString: string) => moment(ISOString).format('DD.MM');
</script>

<template>
  <div overflow-hidden rounded-1rem>
    <q-expansion-item
      hide-expand-icon
      header-class="p-0 flex flex-row gap-0.5rem rounded-1rem bg-bg [&_.q-focus-helper]:hidden"
      :duration="100"
    >
      <template #header>
        <SReadonlyField
          :title="$t('admin.diary.mode') + ' ' + ISODateToDDMM(diary.date)"
          :value="diary.cycle ? $t('admin.diary.cycle') + ' ' + diary.cycle : $t('admin.diary.rest')"
          class="cycles"
          w="100%"
          bg-accent
        />
        <SReadonlyField
          :title="$t('admin.diary.total') + ' ' + ISODateToDDMM(diary.date)"
          :value="propsTotal(diary) ?? 0"
          class="total"
          w="100%"
        />
      </template>
      <div v-for="prop in diary.props" :key="prop.id" mt-0.5rem>
        <p>{{ prop.label }}</p>
        <p>{{ prop.value }}</p>
        <SBtnToggle :model-value="prop.value" :options="toggleOpts" readonly />
      </div>
    </q-expansion-item>
  </div>
</template>
