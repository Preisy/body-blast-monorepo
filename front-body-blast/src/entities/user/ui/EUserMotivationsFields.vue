<script setup lang="ts">
import { SInput } from 'shared/ui';

defineProps<{
  readonly?: boolean;
}>();
</script>

<template>
  <SInput :readonly="readonly" name="loadRestrictions" :label="$t('auth.signUp.motivations.fields.loadRestrictions')" />
  <SInput :readonly="readonly" name="sportsExp" :label="$t('auth.signUp.motivations.fields.sportExperience')" />
  <SInput :readonly="readonly" name="goals" :label="$t('auth.signUp.motivations.fields.targets')" />
</template>
