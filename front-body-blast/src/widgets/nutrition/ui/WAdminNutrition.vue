<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { FNutritionListForm } from 'features/nutrition';
import { useAdminNutritionStore, Nutrition } from 'entities/nutrition';
import { useLoadingAction } from 'shared/lib';
import { SBtn, SComponentWrapper } from 'shared/ui';

export interface WAdminNutritionLongProps {
  nutrition: Nutrition;
}
const props = defineProps<WAdminNutritionLongProps>();
const mealItems = computed(() => props.nutrition.mealItems || []);

const { nutritionList, deleteNutrition } = useAdminNutritionStore();

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();

const onDelete = async () => {
  //TODO: show confirm dialog before deletion.
  useLoadingAction(nutritionList.deleteState, () =>
    deleteNutrition({ id: props.nutrition.id }),
  );
};
</script>

<template>
  <SComponentWrapper h-full>
    <div flex flex-row justify-between>
      <h1 mb-1rem>{{ nutrition.name }}</h1>
      <SBtn
        :icon="symRoundedDelete"
        @click="onDelete"
        :loading="nutritionList.deleteState.isLoading()"
      />
    </div>

    <FNutritionListForm
      ref="forms"
      :nutrition-id="nutrition.id"
      :title="nutrition.name"
      :init-values="mealItems"
      mb-0.5rem
    />
  </SComponentWrapper>
</template>
