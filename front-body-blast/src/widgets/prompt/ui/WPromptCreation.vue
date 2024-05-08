<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, uniqueId } from 'lodash';
import { useI18n } from 'vue-i18n';
import { Prompt, useAdminPromptStore } from 'entities/prompt';
import { SListControls, SForm, SInput, SFilePicker, SComponentWrapper } from 'shared/ui';

const { t } = useI18n();

const promptsList = ref<Array<Partial<Prompt.Post.Dto & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const schema = toTypedSchema(Prompt.validation(t));
const forms = ref<Array<InstanceType<typeof SForm>>>([]);
const { postPrompts, prompts } = useAdminPromptStore();

const onsubmit = async () => {
  // apply values of each form to array
  for (let index = 0; index < forms.value.length; index++) {
    const form = forms.value[index];
    await form.handleSubmit((values: Prompt.Post.Dto) => assign(promptsList.value[index], values))();
  }

  //filter empty and partial values if some exists
  const promptsDto: Array<Prompt.Post.Dto> = promptsList.value
    .filter((prompt) => prompt.photo && prompt.video && prompt.type)
    .map<Prompt.Post.Dto>((prompt) => ({
      photo: prompt.photo!,
      type: prompt.type!,
      video: prompt.video!,
    }));

  //if exists prompts to push
  if (promptsDto.length) {
    //push
    await postPrompts(promptsDto);

    //check response
    if (prompts.createState.isSuccess()) {
      //clear forms
      forms.value.forEach((form) => form.resetForm());
      //refresh prompts forms. Remain only one
      promptsList.value = [{ key: uniqueId('prompt-') }];
    }
  }
};
const onadd = () => promptsList.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => promptsList.value.splice(index, 1);
</script>

<template>
  <SComponentWrapper flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.header') }}</h1>
    <div v-for="(prompt, index) in promptsList" :key="prompt.key">
      <p mb-0.5rem>{{ $t('admin.prompt.list.header') }} {{ index + 1 }}</p>

      <SForm ref="forms" :field-schema="schema" p="0!" mb-0.5rem>
        <SInput name="type" :label="$t('admin.prompt.list.type')" />
        <div flex flex-row gap-x-0.5rem>
          <SFilePicker
            name="photo"
            :label="$t('admin.prompt.list.photo')"
            accept=".jpg, .jpeg, .png"
            w="1/2"
            label-no-wrap
            flex-1
          />
          <SFilePicker name="video" :label="$t('admin.prompt.list.video')" accept=".mp4" w="1/2" label-no-wrap flex-1 />
        </div>

        <template #submit-btn>
          <SListControls
            :disabled-add="index !== promptsList.length - 1"
            :disabled-submit="index !== promptsList.length - 1"
            :disabled-remove="promptsList.length === 1"
            @add="onadd"
            @remove="() => onremove(index)"
            @submit="onsubmit"
            :loading-submit="prompts.createState.isLoading()"
            mt-0.5rem
          />
        </template>
      </SForm>
    </div>
  </SComponentWrapper>
</template>
