<script setup lang="ts">
import moment from 'moment';
import { QIcon, QDate, QDateProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import { isToday } from 'shared/lib';

export interface SCalendarProps extends QDateProps {}
const props = defineProps<SCalendarProps>();

const { t } = useI18n();

const showDateModal = ref(false);

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void;
}>();

const dateValue = computed({
  get() {
    return props.modelValue.split('-').join('/');
  },
  set(value: string) {
    showDateModal.value = false;
    if (!value) return;
    return emit('update:modelValue', value);
  },
});

const getDate = (td: string) => {
  const localTd = moment(td.split('/').join('-')).utc(true);

  if (props.defaultView == 'Months') return new Date(td).toLocaleString('ru-RU', { month: 'long' });
  return isToday(td) ? t('global.date.today') : localTd.format('DD.MM');
};
</script>

<template>
  <div flex justify-center>
    <div w-min flex items-center justify-center gap-2 @click="showDateModal = true">
      <p text-center font-800>{{ getDate(dateValue) }}</p>
      <q-icon name="calendar_month" text-black />
    </div>
    <q-popup-proxy cover v-if="showDateModal">
      <q-date
        v-bind="$props"
        absolute
        left="1/2"
        top="1/2"
        translate-x="-1/2"
        translate-y="-1/2"
        z-100
        v-model="dateValue"
      />
    </q-popup-proxy>
  </div>
</template>
