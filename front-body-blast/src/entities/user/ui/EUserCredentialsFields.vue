<script setup lang="ts">
import { SInput } from 'shared/ui';
</script>

<template>
  <SInput
    name="firstname"
    autocomplete="section-signup given-name"
    :label="$t('auth.signUp.credentials.fields.firstname')"
  />
  <SInput
    name="lastname"
    autocomplete="section-signup family-name"
    :label="$t('auth.signUp.credentials.fields.lastname')"
  />
  <SInput name="email" autocomplete="section-signup email" :label="$t('auth.signUp.credentials.fields.email')" />
  <SInput
    name="password"
    type="password"
    autocomplete="section-signup new-password"
    :label="$t('auth.signUp.credentials.fields.password')"
  />
  <SInput
    name="passwordRepeat"
    type="password"
    autocomplete="section-signup new-password"
    :label="$t('auth.signUp.credentials.fields.passwordRepeat')"
  />
</template>
