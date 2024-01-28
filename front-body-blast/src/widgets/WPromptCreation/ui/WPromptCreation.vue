<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, uniqueId } from 'lodash';
import { useI18n } from 'vue-i18n';
import { FListControls } from 'features/FListControls';
import { Prompt } from 'shared/api/admin';
import { SInput, SFilePicker } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const { t } = useI18n();

const prompts = ref<Array<Partial<Prompt & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const schema = toTypedSchema(Prompt.validation(t));

const onsubmit = (values: object, index: number) => assign(prompts.value[index], values);
const onadd = () => prompts.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => prompts.value.splice(index, 1);
</script>

<template>
  <SComponentWrapper flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.header') }}</h1>
    <div v-for="(prompt, index) in prompts" :key="prompt.key">
      <p mb-0.5rem>{{ $t('admin.prompt.list.header') }} {{ index + 1 }}</p>

      <SForm @submit="(values) => onsubmit(values, index)" :field-schema="schema" p="0!" mb-0.5rem>
        <SInput name="type" :label="$t('admin.prompt.list.type')" />
        <div flex flex-row gap-x-0.5rem>
          <SFilePicker name="photo" :label="$t('admin.prompt.list.photo')" w="1/2" flex-1 />
          <SFilePicker name="video" :label="$t('admin.prompt.list.video')" w="1/2" flex-1 />
        </div>

        <template #submit-btn>
          <FListControls
            :disabled-add="index !== prompts.length - 1"
            @add="onadd"
            mt-0.5rem
            @remove="() => onremove(index)"
          />
        </template>
      </SForm>
    </div>
  </SComponentWrapper>
</template>
