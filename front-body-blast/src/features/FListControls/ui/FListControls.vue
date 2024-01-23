<script setup lang="ts">
import { symRoundedAdd, symRoundedDelete, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { SBtn } from 'shared/ui/btns';

withDefaults(
  defineProps<{
    disabledAdd?: boolean;
    disabledRemove?: boolean;
    disabledSubmit?: boolean;
  }>(),
  { disabledAdd: false, disabledApply: false, disabledRemove: false },
);

defineEmits<{
  add: [];
  remove: [];
  submit: [];
}>();
</script>

<template>
  <div flex flex-row gap-x-0.5rem>
    <SBtn @click="$emit('add')" :icon="symRoundedAdd" bg="bg!" v-if="!disabledAdd" />
    <SBtn @click="$emit('remove')" :icon="symRoundedDelete" bg="bg!" v-if="!disabledRemove" />
    <SBtn type="submit" @click="$emit('submit')" :icon="symRoundedDone" ml-auto v-if="!disabledSubmit" />
  </div>
</template>
