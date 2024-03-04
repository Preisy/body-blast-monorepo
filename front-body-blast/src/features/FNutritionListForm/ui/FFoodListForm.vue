<!-- Significant part of component is copy-paste from FNutritionListForm.vue -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { uniqueId } from 'lodash';
import { useAdminFoodStore } from 'shared/api/admin';
import { Food } from 'shared/api/food';
import { SListControls } from 'shared/ui/btns';
import { SInput } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';
import { SRemoveDialog } from 'shared/ui/SRemoveDialog';
import NutritionListHeader, { NutritionListHeaderProps } from './NutritionListHeader.vue';

export interface FFoodListFormProps {
  category: NutritionListHeaderProps['category'];
  initValues?: Array<Food>;
}

const props = defineProps<FFoodListFormProps>();
const emit = defineEmits<{
  create: [Pick<Food, 'name' | 'category'>]; //Emit only name and category. 'type' will be added in WAdminFood
  edit: [Pick<Food, 'id' | 'name'>]; //Id is mandatory. 'name' field is only field in form
  remove: [number];
}>();
const forms = ref<Array<InstanceType<typeof SForm>>>();

const { foodList } = useAdminFoodStore();

const lines = ref<Array<Partial<Food & { uniqueId: string }>>>(
  props.initValues?.map((el) => ({ ...el, uniqueId: uniqueId('line-') })) ?? [],
);

const dialog = ref<InstanceType<typeof SRemoveDialog>>();
const removeItemIndex = ref<number>();
const onRemoveApply = async () => {
  if (removeItemIndex.value === undefined || removeItemIndex.value === null) return;
  const food = lines.value[removeItemIndex.value];
  if (!food) return;

  if (!food.id) {
    lines.value.splice(removeItemIndex.value, 1);
    return;
  }
  // if deletionDialog was approved -> emit 'remove' signal to parent
  emit('remove', food.id);
  // See watchEffect in the end of <script> to further explanaition
};

const onremove = (index: number) => {
  dialog.value?.show();
  foodList.deleteState.error();
  removeItemIndex.value = index;
};
const onadd = () => {
  lines.value.push({ uniqueId: uniqueId('line-') });
};

const onsubmit = async (index: number, values: Pick<Food, 'name'>) => {
  const line = lines.value[index];
  if (!line) return;

  if (!line.name) emit('create', { name: values.name, category: props.category });
  else emit('edit', { id: line.id!, name: values.name });
};
const validationSchema = toTypedSchema(Food.validation().pick({ name: true }));

const getFormValues = async () => {
  if (!forms.value) return;
  const result: Array<Food> = [];
  for (const form of forms.value)
    await form.handleSubmit((values) => result.push({ ...values, category: props.category }))();
  return result;
};

defineExpose({
  getFormValues,
  category: props.category,
});

watchEffect(() => {
  if (removeItemIndex.value === undefined || removeItemIndex.value === null) return;
  if (foodList.deleteState.isSuccess()) lines.value.splice(removeItemIndex.value, 1);
});
onMounted(() => {
  if (!lines.value.length) lines.value.push({ uniqueId: uniqueId('line-') });
});
</script>

<template>
  <div flex flex-col gap-y-0.5rem>
    <NutritionListHeader :category="category" />

    <SForm
      ref="forms"
      v-for="(line, index) of lines"
      :key="line.uniqueId"
      @submit="(value) => onsubmit(index, value)"
      :field-schema="validationSchema"
      :init-values="line"
      p="0!"
    >
      <div>
        <SInput name="name" :label="$t('admin.nutrition.name')" />
      </div>

      <template #submit-btn>
        <SListControls
          disabled-submit
          :disabled-add="index !== lines.length - 1"
          @remove="() => onremove(index)"
          @add="onadd"
          mt-0.5rem
        />
      </template>
    </SForm>

    <SRemoveDialog ref="dialog" @apply="onRemoveApply" />
  </div>
</template>