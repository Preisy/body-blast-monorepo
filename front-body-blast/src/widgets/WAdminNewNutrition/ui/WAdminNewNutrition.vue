<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { FNutritionListForm } from 'features/FNutritionListForm';
import { useAdminNutritionStore } from 'shared/api/admin';
import { Nutrition } from 'shared/api/nutrition';
import { useLoadingAction } from 'shared/lib/loading';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

export interface WAdminNewNutritionProps {
  userId: number;
}
const props = defineProps<WAdminNewNutritionProps>();

const { postNutrition, postNutritionResponse } = useAdminNutritionStore();
const schema = Nutrition.validation().pick({ name: true });

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();
const categories = [1, 2, 3] as const;
const nutritionName = ref<string | null>();
const onsubmit = async (values: z.infer<typeof schema>) => {
  if (!forms.value) return;

  const categories: Array<Array<Nutrition.Item>> = [];
  for (const form of forms.value) categories.push((await form.getFormValues()) ?? []);

  useLoadingAction(postNutritionResponse, () =>
    postNutrition({ name: values.name, userId: props.userId, mealItems: categories.flat() }),
  );
};
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_nutrition_title') }}</h1>
    <SForm
      @submit="onsubmit"
      :loading="postNutritionResponse.state.isLoading()"
      :field-schema="toTypedSchema(schema)"
      p="0!"
      mt-0.5rem
    >
      <SInput
        name="name"
        :label="$t('admin.nutrition.name')"
        @update:model-value="(val) => (nutritionName = String(val))"
      />
    </SForm>

    <FNutritionListForm
      ref="forms"
      v-for="category in categories"
      :key="category"
      :category="category"
      :title="nutritionName ?? 'NutritionName'"
      mb-0.5rem
    />
  </SComponentWrapper>
</template>
