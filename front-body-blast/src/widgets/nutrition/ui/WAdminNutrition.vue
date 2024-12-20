<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { FNutritionListForm } from 'features/nutrition';
import { useAdminNutritionStore, Nutrition } from 'entities/nutrition';
import { useLoadingAction } from 'shared/lib';
import { SBtn, SComponentWrapper, SConfirmDialog } from 'shared/ui';

export interface WAdminNutritionLongProps {
  nutrition: Nutrition;
}
const props = defineProps<WAdminNutritionLongProps>();
const mealItems = computed(() => props.nutrition.mealItems);

const { nutritionList, deleteNutrition } = useAdminNutritionStore();

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();

const showDialog = ref<boolean>(false);

const applyDeletion = () => {
  useLoadingAction(nutritionList.deleteState, () => deleteNutrition({ id: props.nutrition.id }));
};
</script>

<template>
  <SComponentWrapper h-full>
    <div flex flex-row justify-between>
      <h1 mb-1rem>{{ nutrition.name }}</h1>
      <SBtn :icon="symRoundedDelete" @click="showDialog = true" :loading="nutritionList.deleteState.isLoading()" />
    </div>

    <FNutritionListForm
      ref="forms"
      mode="update"
      :id="nutrition.id"
      :title="nutrition.name"
      :init-values="mealItems"
      mb-0.5rem
    />

    <SConfirmDialog v-model="showDialog" type="deletion" @confirm="applyDeletion" />
  </SComponentWrapper>
</template>
