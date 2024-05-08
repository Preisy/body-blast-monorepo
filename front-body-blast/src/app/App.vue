<script setup lang="ts">
import 'virtual:uno.css';
import { Loading, Screen } from 'quasar';
import { SLogo } from 'shared/ui';

Screen.setSizes({ sm: 450, md: 900, lg: 1280, xl: 1440 });
Loading.setDefaults({
  spinner: SLogo,
  customClass: '[&>.q-loading\_\_backdrop]:opacity-40',
  backgroundColor: 'bg',
});
</script>

<template>
  <router-view />
</template>
