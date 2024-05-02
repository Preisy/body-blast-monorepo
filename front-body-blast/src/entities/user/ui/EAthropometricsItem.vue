<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Anthropometry, useProfileStore } from 'shared/api/anthropometry';
import { AppBaseEntity } from 'shared/api/base';
import { SForm } from 'shared/ui/form';
import { SInput } from 'shared/ui/inputs';

export interface EAthropometricsItemProps {
  readonly: boolean;
  profile: Anthropometry;
}
defineProps<EAthropometricsItemProps>();
defineEmits<{
  submit: [id: AppBaseEntity['id'], values: z.infer<ReturnType<typeof Anthropometry.validation>>];
}>();

const schema = toTypedSchema(Anthropometry.validation());
const fields: (keyof Anthropometry)[] = ['weight', 'waist', 'abdomen', 'shoulder', 'hip', 'hipVolume'];
const { anthropometry } = useProfileStore();
</script>

<template>
  <SForm
    :readonly="readonly"
    :init-values="profile"
    :field-schema="schema"
    :loading="anthropometry.updateState.isLoading()"
    class="[&_.s-form-inputs]:(grid grid-cols-2 gap-2)"
    @submit="(values) => $emit('submit', profile.id, values)"
  >
    <SInput
      v-for="field of fields"
      :key="field"
      :name="field"
      :readonly="readonly"
      :label="$t(`home.profile.athropometrics.${field}`)"
      centered
    />
  </SForm>
</template>
