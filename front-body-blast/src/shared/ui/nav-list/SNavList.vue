<script setup lang="ts">
export interface RouteRecord {
  name: string;
  label: string;
}
defineProps<{
  routes: RouteRecord[];
}>();
</script>

<template>
  <q-tabs content-class="gap-x-0.5rem justify-center">
    <q-route-tab
      v-for="route in routes"
      :key="route.name"
      :to="route.name"
      :label="route.label"
      :ripple="false"
      active-class="opacity-100!"
      flex="none!"
      p-0
      normal-case
      opacity-20
      transition-opacity-300
      class="[&_.q-tab\_\_indicator]:display-none [&_.q-tab\_\_label]:fw-bold!"
    />
  </q-tabs>
</template>
