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
    <div @click="showDateModal = true" w-min flex cursor-pointer items-center justify-center gap-2>
      <p text-center font-800>{{ getDate(dateValue) }}</p>
      <q-icon name="calendar_month" text-black />
    </div>
    <q-dialog v-model="showDateModal">
      <q-date v-bind="$props" v-model="dateValue" left="1/2" top="1/2" translate-x="-1/2" translate-y="-1/2" absolute />
    </q-dialog>
  </div>
</template>
