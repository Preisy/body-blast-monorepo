<script setup lang="ts">
const modelValue = defineModel<boolean>();
</script>

<template>
  <q-dialog v-bind="$props" v-model="modelValue">
    <slot />
  </q-dialog>
</template>
