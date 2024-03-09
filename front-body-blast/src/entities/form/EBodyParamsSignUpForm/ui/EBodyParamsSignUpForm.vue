<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput :ref="`${123}`" name="age" :label="$t('auth.signUp.bodyParams.fields.age')" />
  <SInput name="weight" :label="$t('auth.signUp.bodyParams.fields.weight')" />
  <SInput name="height" :label="$t('auth.signUp.bodyParams.fields.height')" />
  <SInput name="weightInYouth" :label="$t('auth.signUp.bodyParams.fields.teenAgeWeight')" />
</template>
