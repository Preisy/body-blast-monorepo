<script setup lang="ts">
import { debounce } from 'quasar';
import { SBtn } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface FSearchPanelProps {
  query: Nillable<string | number>;
}
const props = defineProps<FSearchPanelProps>();
const emit = defineEmits<{
  'update:query': [newValue: Nillable<string | number>];
}>();

const value = ref(props.query);
const onsubmit = () => emit('update:query', value.value);
watch(value, debounce(onsubmit, 300));
</script>

<template>
  <SComponentWrapper w-full flex items-center gap-x-0.5rem>
    <SInput v-model:model-value="value" name="query" w-full :label="$t('admin.profile.search.label')" />
    <SBtn h-min icon="sym_r_search" type="submit" @click="onsubmit" />
  </SComponentWrapper>
</template>
