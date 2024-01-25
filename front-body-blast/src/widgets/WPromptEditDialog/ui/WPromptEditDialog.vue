<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { QDialogProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { Prompt, useAdminPromptStore } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SInput, SFilePicker } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';

export interface WPromptEditDialogProps extends QDialogProps {
  promptData: Prompt;
}
const props = defineProps<WPromptEditDialogProps>();

const emit = defineEmits<{
  'update:model-value': [boolean];
}>();

const { t } = useI18n();
const schema = toTypedSchema(Prompt.validation(t));
const { patchPrompt, patchPromptState, getPrompts } = useAdminPromptStore();
useLoading(patchPromptState);

const updatePrompt = async (values: z.infer<ReturnType<typeof Prompt.validation>>) => {
  await patchPrompt(props.promptData.id, values);
  console.log(patchPromptState.state.value);
  if (patchPromptState.state.isSuccess()) {
    emit('update:model-value', false); //close dialog after success
    getPrompts({ type: '' });
  }
};
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="(val) => $emit('update:model-value', val)">
    <div rounded="1rem!" bg-bg p-1rem>
      <SForm :field-schema="schema" p="0!" mb-0.5rem @submit="updatePrompt">
        <SInput :model-value="promptData.type" name="type" :label="$t('admin.prompt.list.type')" />
        <div flex flex-row gap-x-0.5rem>
          <SFilePicker
            :display-value="promptData.photoLink"
            name="photo"
            :label="$t('admin.prompt.list.photo')"
            w="1/2"
            flex-1
          />
          <SFilePicker
            :display-value="promptData.videoLink"
            name="video"
            :label="$t('admin.prompt.list.video')"
            w="1/2"
            flex-1
          />
        </div>
        <template #submit-btn>
          <div mt-0.5rem flex flex-row>
            <SBtn :icon="symRoundedClose" @click="$emit('update:model-value', false)" />
            <SBtn type="submit" :icon="symRoundedDone" ml-auto :loading="patchPromptState.state.isLoading()" />
          </div>
        </template>
      </SForm>
    </div>
  </q-dialog>
</template>
