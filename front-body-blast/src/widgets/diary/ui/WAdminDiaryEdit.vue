<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { symRoundedAdd, symRoundedDelete } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { FieldArray, FieldEntry } from 'vee-validate';
import { z } from 'zod';
import { useAdminDiaryStore } from 'entities/diary';
import { SListControls, SInput, SStructure, SBtn, SForm } from 'shared/ui';

const { getDiaryScheme, patchDiaryScheme } = useAdminDiaryStore();

//TODO: fetch scheme, when api will be ready
//useLoadingAction(getDiaryScheme);
const schema = z.object({
  props: z.array(z.string().min(1)),
});
const typedSchema = toTypedSchema(schema);
const onsubmit = (values: z.infer<typeof schema>) => {
  console.log(values);
};

const initValues = { props: ['abc', 'def'] }; //TODO: remove, when api will be ready
</script>

<template>
  <SStructure>
    <SForm @submit="onsubmit" :field-schema="typedSchema" :init-values="initValues" disable-submit-btn mt-2rem p="0!">
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

        <SListControls disabled-remove @add="push('')" />
      </FieldArray>
    </SForm>
  </SStructure>
</template>
