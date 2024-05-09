<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { uniqueId } from 'lodash';
import { useAdminNutritionStore, Nutrition } from 'entities/nutrition';
import { SConfirmDialog, SListControls, SForm, SInput } from 'shared/ui';
import NutritionListHeader from './NutritionListHeader.vue';

export interface FNutritionListFormProps {
  title: string;
  category: 1 | 2 | 3;
  initValues?: Array<Nutrition.Item>;
}

const props = defineProps<FNutritionListFormProps>();
const emit = defineEmits<{
  submit: [Array<Nutrition.Item>?];
}>();

// Used only for buttons loading state
const { nutritionList } = useAdminNutritionStore();

// All mealItems forms
const forms = ref<Array<InstanceType<typeof SForm>>>();

// lines === mealItems, but with _.uniqueId() as vue key property
const lines = ref<Array<Partial<Nutrition.Item & { uniqueId: string }>>>(
  props.initValues?.map((el) => ({ ...el, uniqueId: uniqueId('line-') })) ?? [],
);

// Deletion dialog ref
const isConfirmDialogShown = ref<boolean>();
const removeItemIndex = ref<number>(); // index to deletion
// Called if user hits 'apply' in deletionDialog.
const onRemoveConfirm = () => {
  if (removeItemIndex.value === undefined || removeItemIndex.value === null) return;
  lines.value.splice(removeItemIndex.value, 1); // Deletes line from array
  setTimeout(() => emit('submit'), 0); // For some reason needs time to update form
};
// If delete btn pressed -> show dialog + save index
const onremove = (index: number) => {
  isConfirmDialogShown.value = true;
  removeItemIndex.value = index;
};
// If add btn pressed -> push empty line to end
const onadd = () => {
  lines.value.push({ uniqueId: uniqueId('line-') });
};
// Getting mealItems from all forms
//form.handleSubmit returns async Fn for some reason, so whole getFormValues is async
const getFormValues = async () => {
  if (!forms.value) return;
  const result: Array<Nutrition.Item> = [];
  for (const form of forms.value)
    await form.handleSubmit((values) => result.push({ ...values, category: props.category }))();
  return result;
};
// If submit btn pressed -> get values from forms and emit
const onsubmit = () => emit('submit');

const validationSchema = toTypedSchema(
  Nutrition.validation().pick({ mealItems: true }).shape.mealItems.element.pick({ type: true, quantity: true }),
);

defineExpose({
  getFormValues,
  resetForms: () => forms.value?.forEach((form) => form.resetForm()),
});

onMounted(() => {
  if (!lines.value.length) lines.value.push({ uniqueId: uniqueId('line-') });
});
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <NutritionListHeader :category="category" :title="title" />

    <q-intersection
      v-for="(line, index) of lines"
      :key="line.uniqueId"
      transition="scale"
      margin="50px 0px 100px 0px"
      min-h-7rem
    >
      <SForm ref="forms" @submit="onsubmit" :field-schema="validationSchema" :init-values="line" p="0!">
        <div flex gap-x-0.5rem>
          <SInput name="type" :label="$t('admin.nutrition.type')" />
          <SInput name="quantity" :label="$t('admin.nutrition.quantity')" />
        </div>

        <template #submit-btn>
          <SListControls
            disabled-submit
            :disabled-add="index !== lines.length - 1"
            :disabled-remove="!(lines.length - 1)"
            :loading-submit="nutritionList.updateState.isLoading()"
            @remove="() => onremove(index)"
            @add="onadd"
            mt-0.5rem
          />
        </template>
      </SForm>
    </q-intersection>

    <SConfirmDialog v-model="isConfirmDialogShown" @confirm="onRemoveConfirm" type="deletion" />
  </div>
</template>
