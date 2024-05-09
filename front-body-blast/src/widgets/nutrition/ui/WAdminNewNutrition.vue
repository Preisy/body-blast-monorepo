<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { FNutritionListForm } from 'features/nutrition';
import { useAdminNutritionStore, Nutrition } from 'entities/nutrition';
import { AppBaseEntity } from 'shared/api';
import { useLoadingAction } from 'shared/lib';
import { SForm, SInput, SComponentWrapper } from 'shared/ui';

export interface WAdminNewNutritionProps {
  userId: AppBaseEntity['id'];
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

  useLoadingAction(nutritionList.createState, async () => {
    await postNutrition({ name: values.name, userId: props.userId, mealItems: categories.flat() });
    useLoadingAction(nutritionList.state, () => getNutritions({ expanded: true }));
    clear();
  });
};
const typedSchema = toTypedSchema(schema);
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_nutrition_title') }}</h1>
    <SForm
      ref="outerForm"
      @submit="onsubmit"
      :loading="nutritionList.createState.isLoading()"
      :field-schema="typedSchema"
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
