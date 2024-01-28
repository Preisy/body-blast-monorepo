<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput :ref="`${123}`" name="age" :label="$t('auth.signUp.bodyParams.fields.age')" />
  <SInput
    name="weightAndHeight"
    mask="###/###"
    fill-mask="_"
    :label="$t('auth.signUp.bodyParams.fields.weightAndHeight')"
  />
  <SInput name="weightInYouth" :label="$t('auth.signUp.bodyParams.fields.teenAgeWeight')" />
</template>
