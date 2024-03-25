<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div text-secondary>
    <q-icon name="sym_r_error" mr-4px h-12px w-12px /><span>{{ msg }}</span>
  </div>
</template>
