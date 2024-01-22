<script lang="ts" setup>
import { SelfControl } from 'shared/api/selfControl';
import { SInput } from 'shared/ui/SInput';

defineProps<{ selfControl: SelfControl; readonly: boolean }>();
</script>

<template>
  <div>
    <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
    <SInput
      mb-2
      name="field"
      :label="$t('home.diary.activity.physical')"
      :readonly="readonly"
      :model-value="selfControl.activivty"
    />
    <SInput
      name="field"
      :label="$t('home.diary.activity.steps')"
      :readonly="readonly"
      :model-value="selfControl.steps"
    />
  </div>
</template>
