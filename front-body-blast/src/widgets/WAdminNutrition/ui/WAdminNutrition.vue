<script setup lang="ts">
import { symRoundedDelete, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
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

const { nutritionList, getNutritions, patchNutrition, deleteNutrition } = useAdminNutritionStore();

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();

const onSubmit = async () => {
  if (!forms.value) return;
  const categories: Array<Array<Nutrition.Item>> = [];
  for (const form of forms.value) categories.push((await form.getFormValues()) ?? []);
  useLoadingAction(nutritionList.updateState, () =>
    patchNutrition({ id: props.nutrition.id, name: props.nutrition.name, mealItems: categories.flat() }),
  );
};

const onDelete = async () => {
  useLoading(nutritionList.deleteState);
  await deleteNutrition({ id: props.nutrition.id });
  useLoadingAction(nutritionList.state, () => getNutritions({ expanded: true }));
};
</script>

<template>
  <SComponentWrapper h-full>
    <div flex flex-row justify-between>
      <h1 mb-1rem>{{ nutrition.name }}</h1>
      <SBtn :icon="symRoundedDelete" @click="onDelete" :loading="nutritionList.deleteState.isLoading()" />
    </div>

    <FNutritionListForm
      ref="forms"
      v-for="category in categories"
      :key="category"
      :category="category"
      :title="nutrition.name"
      :init-values="mealItems.filter((item) => item.category === category)"
      mb-0.5rem
    />
    <div flex flex-row justify-end>
      <SBtn
        :icon="symRoundedDone"
        @click="onSubmit"
        :loading="nutritionList.createState.isLoading() || nutritionList.updateState.isLoading()"
      />
    </div>
  </SComponentWrapper>
</template>
