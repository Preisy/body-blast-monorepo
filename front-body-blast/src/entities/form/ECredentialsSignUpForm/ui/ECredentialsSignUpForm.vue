<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput
    name="firstname"
    autocomplete="section-signup shipping firstname"
    :label="$t('auth.signUp.credentials.fields.firstname')"
  />
  <SInput
    name="lastname"
    autocomplete="section-signup shipping lastname"
    :label="$t('auth.signUp.credentials.fields.lastname')"
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
