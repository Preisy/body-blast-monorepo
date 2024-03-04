<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { QDialog } from 'quasar';
import { SBtn } from 'shared/ui/btns';

const emit = defineEmits<{
  discard: [];
  apply: [];
}>();

const dialog = ref<InstanceType<typeof QDialog>>();
defineExpose({
  show: () => dialog.value?.show(),
  hide: () => dialog.value?.hide(),
});

const ondiscard = () => {
  dialog.value?.hide();
  emit('discard');
};
const onapply = () => {
  dialog.value?.hide();
  emit('apply');
};
</script>

<template>
  <QDialog ref="dialog">
    <div rounded="1rem!" bg-primary p-1rem>
      <!-- TODO: I18n -->
      <h2 mb-1.5rem text-bg>Хотите удалить?</h2>
      <div flex justify-between>
        <SBtn :icon="symRoundedClose" bg="bg!" @click="ondiscard" />
        <SBtn :icon="symRoundedDone" @click="onapply" />
      </div>
    </div>
  </QDialog>
</template>
