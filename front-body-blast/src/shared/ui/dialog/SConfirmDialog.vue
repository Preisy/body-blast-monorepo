<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { SBtn, SDialog } from 'shared/ui';

export interface Props {
  label?: string;
  type?: 'deletion';
}

const props = defineProps<Props>();
if (!props.type && !props.label) throw new Error('SConfirmDialog: type or label is required');

const modelValue = defineModel<boolean>();

defineEmits<{
  discard: [];
  confirm: [];
  'update:modelValue': [boolean];
}>();
</script>

<template>
  <SDialog v-model="modelValue">
    <div rounded="1rem!" bg-primary p-1rem>
      <h2 mb-1.5rem text-bg>{{ $props.label ?? $t(`global.dialog.${$props.type}.question`) }}</h2>
      <div flex justify-between>
        <SBtn
          :icon="symRoundedClose"
          bg="bg!"
          @click="
            $emit('discard');
            $emit('update:modelValue', false);
          "
        />
        <SBtn
          :icon="symRoundedDone"
          @click="
            $emit('confirm');
            $emit('update:modelValue', false);
          "
        />
      </div>
    </div>
  </SDialog>
</template>
