<script setup lang="ts">
import { FNutritionListForm } from 'features/FNutritionListForm';
import { useAdminNutritionStore } from 'shared/api/admin';
import { Nutrition } from 'shared/api/nutrition';
import { useLoadingAction } from 'shared/lib/loading';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNutritionLongProps {
  nutrition: Nutrition;
}
const props = defineProps<WAdminNutritionLongProps>();
const mealItems = computed(() => props.nutrition.mealItems || []);
const categories = [1, 2, 3] as const;

const { patchNutrition, patchNutritionResponse } = useAdminNutritionStore();

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();

const onSubmit = async () => {
  if (!forms.value) return;
  const categories: Array<Array<Nutrition.Item>> = [];
  for (const form of forms.value) categories.push((await form.getFormValues()) ?? []);
  useLoadingAction(patchNutritionResponse, () =>
    patchNutrition({ id: props.nutrition.id, name: props.nutrition.name, mealItems: categories.flat() }),
  );
};
</script>

<template>
  <SComponentWrapper h-full>
    <h1 mb-1rem>{{ nutrition.name }}</h1>

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
