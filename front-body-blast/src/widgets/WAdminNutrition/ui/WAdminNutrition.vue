<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { FNutritionListForm } from 'features/FNutritionListForm';
import { useAdminNutritionStore } from 'shared/api/admin';
import { Nutrition } from 'shared/api/nutrition';
import { useLoading, useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNutritionLongProps {
  nutrition: Nutrition;
}
const props = defineProps<WAdminNutritionLongProps>();
const mealItems = computed(() => props.nutrition.mealItems || []);
const categories = [1, 2, 3] as const;

const {
  getNutritionsResponse,
  getNutritions,
  patchNutrition,
  patchNutritionResponse,
  deleteNutrition,
  deleteNutritionResponse,
} = useAdminNutritionStore();

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();

const onSubmit = async () => {
  if (!forms.value) return;
  const categories: Array<Array<Nutrition.Item>> = [];
  for (const form of forms.value) categories.push((await form.getFormValues()) ?? []);
  console.log(categories);
  useLoadingAction(patchNutritionResponse, () =>
    patchNutrition({ id: props.nutrition.id, name: props.nutrition.name, mealItems: categories.flat() }),
  );
};

const onDelete = async () => {
  const unwatch = useLoading(deleteNutritionResponse);
  await deleteNutrition({ id: props.nutrition.id });
  unwatch();
  useLoadingAction(getNutritionsResponse, () => getNutritions({ expanded: true }));
};
</script>

<template>
  <SComponentWrapper h-full>
    <div flex flex-row justify-between>
      <h1 mb-1rem>{{ nutrition.name }}</h1>
      <SBtn :icon="symRoundedDelete" @click="onDelete" :loading="deleteNutritionResponse.state.isLoading()" />
    </div>

    <FNutritionListForm
      ref="forms"
      v-for="category in categories"
      :key="category"
      :category="category"
      :title="nutrition.name"
      :init-values="mealItems.filter((item) => item.category === category)"
      mb-0.5rem
      @submit="onSubmit"
    />
  </SComponentWrapper>
</template>
