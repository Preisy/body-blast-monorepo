<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput name="nutritRestrict" :label="$t('auth.signUp.forbiddens.fields.diet')" />
  <SInput name="allergy" :label="$t('auth.signUp.forbiddens.fields.allergic')" />
  <SInput name="mealIntolerance" :label="$t('auth.signUp.forbiddens.fields.intolerance')" />
</template>
