<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { QDialog, QDialogProps } from 'quasar';
import { SBtn } from 'shared/ui/btns';

const props = defineProps<{
  modelValue?: QDialogProps['modelValue'];
}>();

const emit = defineEmits<{
  discard: [];
  apply: [];
  'update:modelValue': [typeof props.modelValue];
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const dialog = ref<InstanceType<typeof QDialog>>();
defineExpose({
  show: () => dialog.value?.show(),
  hide: () => dialog.value?.hide(),
});

const ondiscard = () => {
  dialog.value?.hide();
};
</script>

<template>
  <QDialog v-model="value" ref="dialog">
    <div bg-primary p-1rem>
      <h2 mb-1.5rem>Хотите удалить?</h2>
      <div flex justify-between>
        <SBtn :icon="symRoundedClose" bg="bg!" @click="ondiscard" />
        <SBtn :icon="symRoundedDone" @click="$emit('apply')" />
      </div>
    </div>
  </QDialog>
</template>
