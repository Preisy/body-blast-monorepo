<script setup lang="ts">
import { FFoodListForm } from 'features/nutrition';
import { AppBaseEntity } from 'shared/api';
import { SInput, SComponentWrapper } from 'shared/ui';

export interface WAdminNewFoodProps {
  userId: AppBaseEntity['id'];
}
defineProps<WAdminNewFoodProps>();

const type = ref('');
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_food_title') }}</h1>

    <SInput v-model="type" watch-model-value :label="$t('admin.nutrition.type')" mb-1rem mt-0.5rem />

    <FFoodListForm :type="type" clean-on-create mb-1.5rem />
  </SComponentWrapper>
</template>
