<script setup lang="ts">
import { symRoundedAdd, symRoundedDelete, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { SBtn } from 'shared/ui';

withDefaults(
  defineProps<{
    disabledAdd?: boolean;
    disabledRemove?: boolean;
    disabledSubmit?: boolean;
    loadingAdd?: boolean;
    loadingRemove?: boolean;
    loadingSubmit?: boolean;
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
    <SBtn v-if="!disabledAdd" @click="$emit('add')" :loading="loadingAdd" :icon="symRoundedAdd" bg="bg!" />
    <SBtn
      v-if="!disabledRemove"
      @click="$emit('remove')"
      :loading="loadingRemove"
      :icon="symRoundedDelete"
      bg="bg!"
      ml-auto
    />
    <SBtn
      v-if="!disabledSubmit"
      @click="$emit('submit')"
      :loading="loadingSubmit"
      :icon="symRoundedDone"
      type="submit"
      :class="{ 'ml-auto': disabledRemove }"
    />
  </div>
</template>
