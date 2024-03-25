<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { FFoodListForm } from 'features/FNutritionListForm';
import { useAdminFoodStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { useLoading } from 'shared/lib/loading';
import { Notify } from 'shared/lib/utils';
import { SBtn } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

export interface WAdminNewFoodProps {
  userId: AppBaseEntity['id'];
}
defineProps<WAdminNewFoodProps>();
const emit = defineEmits<{
  created: [type: string];
}>();

const { postFood, foodList } = useAdminFoodStore();

const categories = [1, 2, 3] as const;
const type = ref();
const forms = ref<Array<InstanceType<typeof FFoodListForm>>>();

const clear = () => {
  type.value = '';
  forms.value?.forEach((form) => form.resetForms());
};
const onCreate = async () => {
  if (!forms.value) return;

  useLoading(foodList.createState);
  await Promise.allSettled(
    forms.value.map(async (form) => {
      const foodValues = await form.getFormValues();
      if (!foodValues) return;
      return Promise.allSettled(foodValues.map((food) => postFood({ ...food, type: type.value })));
    }),
  );

  emit('created', type.value);
  Notify.createSuccess();
  clear();
};
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_food_title') }}</h1>

    <SInput v-model="type" watch-model-value :label="$t('admin.nutrition.type')" mb-1rem mt-0.5rem />

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
