<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { FNutritionListForm } from 'features/FNutritionListForm';
import { useAdminNutritionStore } from 'shared/api/admin';
import { Nutrition } from 'shared/api/nutrition';
import { useLoading, useLoadingAction } from 'shared/lib/loading';
import { SInput } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

export interface WAdminNewNutritionProps {
  userId: number;
}
const props = defineProps<WAdminNewNutritionProps>();

const { postNutrition, getNutritions, nutritionList } = useAdminNutritionStore();
const schema = Nutrition.validation().pick({ name: true });

const forms = ref<Array<InstanceType<typeof FNutritionListForm>>>();
const outerForm = ref<InstanceType<typeof SForm>>();
const categories = [1, 2, 3] as const;
const nutritionName = ref<string | null>();

const clear = () => {
  forms.value?.forEach((form) => form.resetForms());
  outerForm.value?.resetForm();
};
const onsubmit = async (values: z.infer<typeof schema>) => {
  if (!forms.value) return;

  const categories: Array<Array<Nutrition.Item>> = [];
  for (const form of forms.value) categories.push((await form.getFormValues()) ?? []);

  useLoading(nutritionList.createState);
  await postNutrition({ name: values.name, userId: props.userId, mealItems: categories.flat() });

  useLoadingAction(nutritionList.state, () => getNutritions({ expanded: true }));
  clear();
};
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_nutrition_title') }}</h1>
    <SForm
      ref="outerForm"
      @submit="onsubmit"
      :loading="nutritionList.createState.isLoading()"
      :field-schema="toTypedSchema(schema)"
      p="0!"
      mt-0.5rem
    >
      <SInput
        name="name"
        :label="$t('admin.nutrition.name')"
        @update:model-value="(val) => (nutritionName = String(val))"
      />

      <FNutritionListForm
        ref="forms"
        v-for="category in categories"
        :key="category"
        :category="category"
        :title="nutritionName ?? 'NutritionName'"
        mb-0.5rem
      />
    </SForm>
  </SComponentWrapper>
</template>
