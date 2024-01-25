<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput
    name="username"
    autocomplete="section-signup shipping username"
    :label="$t('auth.signUp.credentials.fields.username')"
  />
  <SInput
    name="email"
    autocomplete="section-signup shipping email"
    :label="$t('auth.signUp.credentials.fields.email')"
  />
  <SInput
    name="password"
    type="password"
    autocomplete="section-signup shipping password"
    :label="$t('auth.signUp.credentials.fields.password')"
  />
  <SInput
    name="passwordRepeat"
    type="password"
    autocomplete="section-signup shipping password"
    :label="$t('auth.signUp.credentials.fields.passwordRepeat')"
  />
</template>
