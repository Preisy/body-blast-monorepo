<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { Anthropometry } from 'shared/api/anthropometry';
import { SInput } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';

export interface EAthropometricsItemProps {
  readonly: boolean;
  profile: Anthropometry;
}
const schema = toTypedSchema(Anthropometry.validation());
const fields: (keyof Anthropometry)[] = ['weight', 'waist', 'abdomen', 'shoulder', 'hip', 'hipVolume'];

defineProps<EAthropometricsItemProps>();
</script>

<template>
  <SForm :readonly="readonly" :field-schema="schema" class="[&_.s-form-inputs]:(grid grid-cols-2 gap-2)">
    <SInput
      v-for="field of fields"
      :key="field"
      :name="field"
      :label="$t(`home.profile.athropometrics.${field}`)"
      centered
      :readonly="readonly"
      :model-value="String(profile[field])"
    />
  </SForm>
</template>
shared/api/anthropometry
