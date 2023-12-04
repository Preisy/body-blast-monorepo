<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { assign, uniqueId } from 'lodash';
import { useI18n } from 'vue-i18n';
import { FListControls } from 'features/FListControls';
import { PromptPage, Prompt, useAdminPromptStore } from 'shared/api/admin';
import { SInput, SFilePicker } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SForm } from 'shared/ui/SForm';

const { t } = useI18n();

const prompts = ref<Array<Partial<Prompt.WithFiles & { key: string }>>>([{ key: uniqueId('prompt-') }]);
const schema = toTypedSchema(PromptPage.validation(t));
const forms = ref<Array<InstanceType<typeof SForm>>>([]);
const { postPrompts, postPromptsState } = useAdminPromptStore();

const onsubmit = async () => {
  // apply values of each form to array
  for (let index = 0; index < forms.value.length; index++) {
    const form = forms.value[index];
    await form.handleSubmit((values: Prompt.WithFiles) => assign(prompts.value[index], values))();
  }

  //filter empty and partial values if some exists
  const promptsDto: Array<Prompt.WithFiles> = prompts.value
    .filter((prompt) => prompt.photo && prompt.video && prompt.type)
    .map<Prompt.WithFiles>((prompt) => ({
      photo: prompt.photo!,
      type: prompt.type!,
      video: prompt.video!,
    }));

  //if exists prompts to push
  if (promptsDto.length) {
    //push
    await postPrompts(promptsDto);

    //check response
    if (postPromptsState.state.isSuccess()) {
      //clear forms
      forms.value.forEach((form) => form.resetForm());
      //refresh prompts forms. Remain only one
      prompts.value = [{ key: uniqueId('prompt-') }];
    }
  }
};
const onadd = () => prompts.value.push({ key: uniqueId('prompt-') });
const onremove = (index: number) => prompts.value.splice(index, 1);
</script>

<template>
  <SComponentWrapper flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.header') }}</h1>
    <div v-for="(prompt, index) in prompts" :key="prompt.key">
      <p mb-0.5rem>{{ $t('admin.prompt.list.header') }} {{ index + 1 }}</p>

      <SForm ref="forms" :field-schema="schema" p="0!" mb-0.5rem>
        <SInput name="type" :label="$t('admin.prompt.list.type')" />
        <div flex flex-row gap-x-0.5rem>
          <SFilePicker name="photo" :label="$t('admin.prompt.list.photo')" w="1/2" flex-1 />
          <SFilePicker name="video" :label="$t('admin.prompt.list.video')" w="1/2" flex-1 />
        </div>

        <template #submit-btn>
          <FListControls
            :disabled-add="index !== prompts.length - 1"
            :disabled-submit="index !== prompts.length - 1"
            :disabled-remove="prompts.length === 1"
            @add="onadd"
            @remove="() => onremove(index)"
            @submit="onsubmit"
            :loading-submit="postPromptsState.state.isLoading()"
            mt-0.5rem
          />
        </template>
      </SForm>
    </div>
  </SComponentWrapper>
</template>
