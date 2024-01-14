<script setup lang="ts">
import { date } from 'quasar';
import { WAthropometrics, WAthropometricsProps } from 'widgets/profile/WAthropometrics';
import { EProfileHeader } from 'entities/profile/EProfileHeader';
import { SStructure } from 'shared/ui/SStructure';
const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
const props: WAthropometricsProps['slides'] = [
  {
    readonly: true,
    dateValue: '2023/10/12',
    profile: { weight: 10, waist: 10, abdomen: 10, shoulder: 10, hip: 10, hipVolume: 10 },
  },
  {
    readonly: true,
    dateValue: '2023/10/22',
    profile: { weight: 12, waist: 12, abdomen: 12, shoulder: 12, hip: 12, hipVolume: 12 },
  },
  {
    readonly: false,
    dateValue: today,
    profile: { weight: 15, waist: 15, abdomen: 15, shoulder: 15, hip: 15, hipVolume: 15 },
  },
];
const userName = 'Имя пользователя';
</script>

<template>
  <SStructure h-full>
    <EProfileHeader :user-name="userName" />
    <WAthropometrics mt-1.75rem :slides="props" />
  </SStructure>
</template>
