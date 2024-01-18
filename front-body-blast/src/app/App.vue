<script setup lang="ts">
import 'virtual:uno.css';
import { SLogo } from 'shared/ui/SLogo';

const $q = useQuasar();

$q.screen.setSizes({ sm: 450, md: 900, lg: 1280, xl: 1440 });
$q.loading.setDefaults({
  spinner: SLogo,
  customClass: '[&>.q-loading\_\_backdrop]:opacity-40',
  backgroundColor: 'bg',
});
</script>

<template>
  <router-view />
</template>
