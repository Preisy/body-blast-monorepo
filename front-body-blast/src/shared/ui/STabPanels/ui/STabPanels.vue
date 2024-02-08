<script lang="ts" setup>
import { QTabPanels, QTabPanelsProps } from 'quasar';
interface STabPanelsProps extends QTabPanelsProps {}
defineProps<STabPanelsProps>();
</script>

<template>
  <q-tab-panels v-bind="$props" animated swipeable infinite static mx--2 class="[&_.q-tab-panel]:(p-2)" h-full>
    <slot />
  </q-tab-panels>
</template>
