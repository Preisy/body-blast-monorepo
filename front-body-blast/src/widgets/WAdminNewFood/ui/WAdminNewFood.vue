<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { FFoodListForm } from 'features/FNutritionListForm';
import { useAdminFoodStore } from 'shared/api/admin';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNewFoodProps {
  userId: number;
}
defineProps<WAdminNewFoodProps>();

const { postFood, foodList } = useAdminFoodStore();

const categories = [1, 2, 3] as const;
const type = ref();
const forms = ref<Array<InstanceType<typeof FFoodListForm>>>();

const clear = () => {
  forms.value?.forEach((form) => form.resetForms());
  type.value = '';
};
const onCreate = async () => {
  if (!forms.value) return;

  for (const form of forms.value) {
    const foodValues = await form.getFormValues();
    if (!foodValues) continue;

    for (const food of foodValues)
      useLoadingAction(foodList.createState, () => postFood({ ...food, type: type.value }));

    clear();
  }
};
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_food_title') }}</h1>

    <SInput v-model="type" name="type" :label="$t('admin.nutrition.type')" mb-1rem mt-0.5rem />

    <FFoodListForm ref="forms" v-for="category in categories" :key="category" :category="category" mb-1.5rem />
    <div flex flex-row justify-end>
      <SBtn
        @click="onCreate"
        :icon="symRoundedDone"
        :loading="foodList.updateState.isLoading() || foodList.createState.isLoading()"
      />
    </div>
  </SComponentWrapper>
</template>
