<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Addition, useTrainingStore } from 'shared/api/training';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const validationSchema = toTypedSchema(Addition.validation());
const additionStore = useTrainingStore();
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ $t('dashboard.trainings.addition.title') }}</h1>
    <SForm
      p="0!"
      :action="additionStore.sendAddition"
      :field-schema="validationSchema"
      :loading="additionStore.additionRequestState.state.isLoading()"
    >
      <SInput name="message" :placeholder="$t('dashboard.trainings.addition.input')" />
    </SForm>
  </SComponentWrapper>
</template>
