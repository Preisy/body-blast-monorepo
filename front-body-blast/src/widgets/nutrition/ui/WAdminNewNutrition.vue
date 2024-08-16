<script setup lang="ts">
import { FNutritionListForm } from 'features/nutrition';
import { AppBaseEntity } from 'shared/api';
import { SInput, SComponentWrapper } from 'shared/ui';

export interface WAdminNewNutritionProps {
  userId: AppBaseEntity['id'];
}
defineProps<WAdminNewNutritionProps>();
const nutritionName = ref<string>('');
const cleanup = () => {
  console.log('Called cleanup!');
  console.log(`before: ${nutritionName.value}`);
  nutritionName.value = '';
  console.log(`after: ${nutritionName.value}`);
};
</script>

<template>
  <SComponentWrapper>
    <h1 py-1rem>{{ $t('admin.nutrition.new_nutrition_title') }}</h1>

    <SInput
      name="name"
      :label="$t('admin.nutrition.name')"
      watch-model-value
      :model-value="nutritionName"
      @update:model-value="(val) => (nutritionName = String(val))"
    />

    <FNutritionListForm @submit="cleanup" mode="create" is-need-reset :title="nutritionName" :id="userId" mb-0.5rem />
  </SComponentWrapper>
</template>
