<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { QDialogProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { Prompt, useAdminPromptStore } from 'shared/api/admin';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SForm } from 'shared/ui/form';
import { SInput, SFilePicker } from 'shared/ui/inputs';

export interface WPromptEditDialogProps extends QDialogProps {
  promptData: Prompt;
}
const props = defineProps<WPromptEditDialogProps>();

const emit = defineEmits<{
  'update:model-value': [boolean];
}>();

const { t } = useI18n();
const rawSchema = Prompt.validation(t).partial();
const schema = toTypedSchema(rawSchema);
const { patchPrompt, prompts } = useAdminPromptStore();

const updatePrompt = async (values: z.infer<typeof rawSchema>) => {
  const dto: Prompt.Patch.Dto = {
    type: values.type ?? props.promptData.type,
  };
  if (values.photo) dto.photo = values.photo;
  else dto.photoLink = props.promptData.photoLink;

  if (values.video) dto.video = values.video;
  else dto.videoLink = props.promptData.videoLink;

  useLoadingAction(prompts.updateState, async () => {
    await patchPrompt(props.promptData.id, dto);
    if (prompts.updateState.isSuccess()) {
      emit('update:model-value', false); //close dialog after success
    }
  });
};

const photoFilename = computed(() => props.promptData.photoLink.split('/').at(-1));
const videoFilename = computed(() => props.promptData.videoLink.split('/').at(-1));
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="(val) => $emit('update:model-value', val)">
    <div rounded="1rem!" bg-bg p-1rem>
      <SForm :field-schema="schema" p="0!" mb-0.5rem @submit="updatePrompt" :init-values="promptData">
        <SInput :model-value="promptData.type" name="type" :label="$t('admin.prompt.list.type')" />
        <div flex flex-row gap-x-0.5rem>
          <SFilePicker
            name="photo"
            :display-value="photoFilename"
            :label="$t('admin.prompt.list.photo')"
            accept=".jpg, .jpeg, .png"
            w="1/2"
            label-no-wrap
            flex-1
          />
          <SFilePicker
            name="video"
            :display-value="videoFilename"
            :label="$t('admin.prompt.list.video')"
            accept=".mp4"
            w="1/2"
            label-no-wrap
            flex-1
          />
        </div>
        <template #submit-btn>
          <div mt-0.5rem flex flex-row>
            <SBtn :icon="symRoundedClose" @click="$emit('update:model-value', false)" />
            <SBtn type="submit" :icon="symRoundedDone" ml-auto :loading="prompts.updateState.isLoading()" />
          </div>
        </template>
      </SForm>
    </div>
  </q-dialog>
</template>
