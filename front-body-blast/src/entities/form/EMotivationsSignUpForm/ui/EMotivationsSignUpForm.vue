<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput name="loadRestrictions" :label="$t('auth.signUp.motivations.fields.loadRestrictions')" />
  <SInput name="sportsExp" :label="$t('auth.signUp.motivations.fields.sportExperience')" />
  <SInput name="goals" :label="$t('auth.signUp.motivations.fields.targets')" />
</template>
