<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
import { SBtn } from 'shared/ui';

export interface SFormProps {
  fieldSchema: TypedSchema; //Vee-validate/Zod value validation schema
  loading?: boolean; //SBtn state props. Displays request status
  disableSubmitBtn?: boolean; //disables submit btn
  initValues?: Record<string, unknown>; //init form with some values
}

const props = defineProps<SFormProps>();

//Vee-validate controls
const { handleSubmit, setValues, resetForm } = useForm({
  validationSchema: props.fieldSchema,
});
// Had a problem: on second render - form was not filled
// if (props.initValues) setValues(props.initValues);
// TODO: weird solution.
watch(
  () => props.initValues,
  (newV) => {
    if (newV) setValues(newV);
  },
  {
    immediate: true,
  },
);

const emits = defineEmits<{
  submit: Parameters<Parameters<typeof handleSubmit>[0]>;
  error: Parameters<Exclude<Parameters<typeof handleSubmit>[1], undefined>>;
}>();
defineExpose({
  handleSubmit,
  resetForm,
});

//On form submit - emits @submit event with values provided to form
const onsubmit = handleSubmit(
  (...data) => emits('submit', ...data),
  (ctx) => emits('error', ctx),
);
</script>

<template>
  <form @submit.prevent="onsubmit" flex flex-col p-1.5rem>
    <div flex flex-col gap-y-0.5rem class="s-form-inputs">
      <slot />
    </div>
    <slot name="submit-btn">
      <SBtn
        v-if="!$slots['submit-btn'] && !disableSubmitBtn"
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
