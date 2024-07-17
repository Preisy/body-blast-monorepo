<script setup lang="ts">
import { SInput } from 'shared/ui';

defineProps<{
  readonly?: boolean;
}>();
</script>

<template>
  <SInput :readonly="readonly" name="age" :label="$t('auth.signUp.bodyParams.fields.age')" />
  <SInput :readonly="readonly" name="weight" :label="$t('auth.signUp.bodyParams.fields.weight')" />
  <SInput :readonly="readonly" name="height" :label="$t('auth.signUp.bodyParams.fields.height')" />
  <SInput :readonly="readonly" name="weightInYouth" :label="$t('auth.signUp.bodyParams.fields.teenAgeWeight')" />
</template>
