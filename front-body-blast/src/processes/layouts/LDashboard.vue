<script setup lang="ts">
import { SNotification } from 'shared/ui/SNotification';
</script>

<template>
  <SNotification />
  <q-layout view="hHh lpr fFf">
    <q-page-container h-screen>
      <RouterView />
    </q-page-container>
    <slot name="footer" />
  </q-layout>
</template>
