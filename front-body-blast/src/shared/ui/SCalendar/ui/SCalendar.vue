<script setup lang="ts">
import moment from 'moment';
import { QIcon, QDate, QDateProps } from 'quasar';
import { useI18n } from 'vue-i18n';

export interface SCalendarProps extends QDateProps {}
const props = defineProps<SCalendarProps>();

const { t } = useI18n();

const today = moment();
const showDateModal = ref(false);

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void;
}>();

const dateValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    showDateModal.value = false;
    if (!value) return;
    return emit('update:modelValue', value);
  },
});
//TODO: total mess with date formats. Force quasar to use ISO format
const getDate = (td: string) => {
  if (props.defaultView == 'Months') return new Date(td).toLocaleString('ru-RU', { month: 'long' });
  return today.diff(td.split('/').join('-'), 'days') <= 1
    ? td.split('/').reverse().slice(0, 2).join('.')
    : t('global.date.today');
};
</script>

<template>
  <div>
    <div flex items-center justify-center gap-2 @click="showDateModal = true">
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
