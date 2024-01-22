<script setup lang="ts">
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary/EDiaryHeader';
import { useSelfControlStore } from 'shared/api/selfControl';
import { useLoadingAction } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

const selfControlStore = useSelfControlStore();
useLoadingAction(selfControlStore.getSelfControlResponse, selfControlStore.getSelfControl);

const selfControlData = computed(() => selfControlStore.getSelfControlResponse.data?.data);
const first = computed(() => selfControlData.value?.[0]);
</script>

<template>
  <div h-full>
    <EDiaryHeader v-if="first" v-bind="first" />
    <WSelfControl v-if="selfControlData" :slides="selfControlData" />
    <SNoResultsScreen v-else p-1.5rem />
  </div>
</template>
