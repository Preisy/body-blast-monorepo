<script setup lang="ts">
import { symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { FieldArray, FieldEntry } from 'vee-validate';
import { z } from 'zod';
import { useAdminDiaryStore } from 'entities/diary';
import { User } from 'shared/api';
import { useLoadingAction } from 'shared/lib';
import { SListControls, SInput, SBtn, SForm, SLoading, SComponentWrapper } from 'shared/ui';

export interface Props {
  id: User['id'];
}
const props = defineProps<Props>();

const { getDiaryScheme, patchDiaryScheme, diaryScheme } = useAdminDiaryStore();

useLoadingAction(diaryScheme, () => getDiaryScheme({ id: props.id }));
const diarySchemeData = computed(() => diaryScheme.data?.data);
const propsLabels = computed(() => diarySchemeData.value?.props?.map((prop) => prop.label) || []);

const schema = z.object({
  props: z.array(z.string().min(1)),
});
const typedSchema = toTypedSchema(schema);
const onsubmit = (values: z.infer<typeof schema>) => {
  patchDiaryScheme({ id: props.id, props: values.props.map((prop) => ({ label: prop })) });
};

const initValues = computed(() => ({ props: propsLabels.value }));
</script>

<template>
  <SComponentWrapper>
    <h1 mb-1rem>{{ $t('admin.diary.edit.title') }}</h1>
    <SLoading v-if="!diarySchemeData" />
    <SForm v-else @submit="onsubmit" :field-schema="typedSchema" :init-values="initValues" disable-submit-btn p="0!">
      <FieldArray name="props" v-slot="{ fields, push, remove }">
        <div
          v-for="(field, idx) in fields as FieldEntry<string>[]"
          :key="field.key"
          w-full
          flex
          flex-row
          items-center
          gap-x-0.5rem
        >
          <SInput :name="`props[${idx}]`" :label="$t('admin.diary.edit.propLabel')" v-model="field.value" w-full />
          <SBtn :icon="symRoundedDelete" @click="remove(idx)" />
        </div>

        <SListControls disabled-remove @add="push('')" :loading-submit="diaryScheme.updateState.isLoading()" />
      </FieldArray>
    </SForm>
  </SComponentWrapper>
</template>
