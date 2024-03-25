<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput name="email" autocomplete="email" :label="$t('auth.login.fields.email')" />
  <SInput name="password" autocomplete="current-password" type="password" :label="$t('auth.login.fields.password')" />
</template>
