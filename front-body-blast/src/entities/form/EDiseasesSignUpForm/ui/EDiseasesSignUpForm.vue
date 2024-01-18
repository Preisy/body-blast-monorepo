<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
import { SSelect } from 'shared/ui/SSelect';
</script>

<template>
  <SInput name="gastroDeseases" :label="$t('auth.signUp.diseases.fields.gastrointestinalDiseases')" />
  <SSelect
    name="insulinResistance"
    :options="[
      { label: $t('global.yes'), value: true },
      { label: $t('global.no'), value: false },
    ]"
    :label="$t('auth.signUp.diseases.fields.insulinResistance')"
  />
  <SInput name="kidneyDesease" :label="$t('auth.signUp.diseases.fields.kidneyDisease')" />
  <SInput name="heartDesease" :label="$t('auth.signUp.diseases.fields.diseasesCVD')" />
  <SInput name="muscleDesease" :label="$t('auth.signUp.diseases.fields.diseasesODA')" />
</template>
