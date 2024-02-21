<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
import { SBtn } from 'shared/ui/btns';

export interface SFormProps {
  fieldSchema: TypedSchema; //Vee-validate/Zod value validation schema
  loading?: boolean; //SBtn state props. Displays request status
  readonly?: boolean; //disables submit btn
  initValues?: Record<string, unknown>; //init form with some values
}

const props = defineProps<SFormProps>();

//Vee-validate controls
const { handleSubmit, setValues } = useForm({
  validationSchema: props.fieldSchema,
});
if (props.initValues) setValues(props.initValues);

const emits = defineEmits<{
  submit: Parameters<Parameters<typeof handleSubmit>[0]>;
}>();
defineExpose({
  handleSubmit,
});

//On form submit - emits @submit event with values provided to form
const onsubmit = handleSubmit((...data) => emits('submit', ...data));
</script>

<template>
  <form @submit.prevent="" @submit="onsubmit" flex flex-col p-1.5rem>
    <div flex flex-col gap-y-0.5rem class="s-form-inputs">
      <slot />
    </div>
    <slot name="submit-btn">
      <SBtn
        v-if="!$slots['submit-btn'] && !readonly"
        :loading="loading"
        icon="done"
        type="submit"
        mt-0.5rem
        h-min
        self-end
      />
    </slot>
  </form>
</template>
