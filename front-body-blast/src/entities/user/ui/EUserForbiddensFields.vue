<script setup lang="ts">
import { SInput } from 'shared/ui';

defineProps<{
  readonly?: boolean;
}>();
</script>

<template>
  <SInput :readonly="readonly" name="nutritRestrict" :label="$t('auth.signUp.forbiddens.fields.nutrition')" />
  <SInput :readonly="readonly" name="allergy" :label="$t('auth.signUp.forbiddens.fields.allergic')" />
  <SInput :readonly="readonly" name="mealIntolerance" :label="$t('auth.signUp.forbiddens.fields.intolerance')" />
</template>
