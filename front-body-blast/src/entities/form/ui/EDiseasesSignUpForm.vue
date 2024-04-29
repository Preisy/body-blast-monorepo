<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
import { SSelect } from 'shared/ui/select';

defineProps<{
  readonly?: boolean;
}>();
</script>

<template>
  <SInput
    :readonly="readonly"
    name="gastroDeseases"
    :label="$t('auth.signUp.diseases.fields.gastrointestinalDiseases')"
  />
  <SSelect
    :readonly="readonly"
    name="insulinResistance"
    :options="[
      { label: $t('global.yes'), value: true },
      { label: $t('global.no'), value: false },
    ]"
    :label="$t('auth.signUp.diseases.fields.insulinResistance')"
  />
  <SInput :readonly="readonly" name="kidneyDesease" :label="$t('auth.signUp.diseases.fields.kidneyDisease')" />
  <SInput :readonly="readonly" name="heartDesease" :label="$t('auth.signUp.diseases.fields.diseasesCVD')" />
  <SInput :readonly="readonly" name="muscleDesease" :label="$t('auth.signUp.diseases.fields.diseasesODA')" />
</template>
