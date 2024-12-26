<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { FieldArray } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { useAdminFileStore } from 'entities/file';
import { Prompt, useAdminPromptStore } from 'entities/prompt';
import { SListControls, SForm, SInput, SFilePicker, SComponentWrapper } from 'shared/ui';

const { t } = useI18n();

const schema = z.object({
  prompts: z.array(Prompt.validation(t)).min(1),
});
const typedSchema = toTypedSchema(schema);
const form = ref<InstanceType<typeof SForm>>();
const { postPrompt, prompts } = useAdminPromptStore();
const fileStore = useAdminFileStore();

const onsubmit = async (values: z.infer<typeof schema>) => {
  const promptsDto: Array<Prompt.Post.Dto> = values.prompts.map<Prompt.Post.Dto>((prompt) => ({
    photo: prompt.photo!,
    type: prompt.type!,
    video: prompt.video,
  }));

  //if exists prompts to push
  if (promptsDto.length) {
    prompts.createState.loading();
    await Promise.allSettled(
      promptsDto.map(async (prompt) => {
        const [photoLink, videoLink] = await Promise.all([
          fileStore.postFile({ file: prompt.photo }),
          prompt.video && fileStore.postFile({ file: prompt.video }),
        ]);
        if (!photoLink.data || (videoLink && !videoLink.data)) {
          prompts.createState.error();
          return;
        }
        postPrompt({ type: prompt.type, photoLink: photoLink.data.link, videoLink: videoLink?.data.link });
      }),
    );

    form.value?.resetForm();
  }
};
</script>

<template>
  <SComponentWrapper flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.prompt.header') }}</h1>

    <SForm
      ref="form"
      @submit="onsubmit"
      :init-values="{ prompts: [{}] }"
      :field-schema="typedSchema"
      disable-submit-btn
      p="0!"
      mb-0.5rem
    >
      <FieldArray name="prompts" v-slot="{ fields, push, remove }">
        <div v-for="(field, idx) in fields" :key="field.key">
          <p mb-0.5rem>{{ $t('admin.prompt.list.header') }} {{ idx + 1 }}</p>
          <SInput :name="`prompts[${idx}].type`" :label="$t('admin.prompt.list.type')" />
          <div my-0.5rem flex flex-row gap-x-0.5rem>
            <SFilePicker
              :name="`prompts[${idx}].photo`"
              :label="$t('admin.prompt.list.photo')"
              accept=".jpg, .jpeg, .png"
              w="1/2"
              flex-1
            />
            <SFilePicker
              :name="`prompts[${idx}].video`"
              :label="$t('admin.prompt.list.video')"
              accept=".mp4"
              w="1/2"
              flex-1
            />
            <!-- TODO: fix label wrapping -->
          </div>
          <SListControls
            :disabled-add="idx !== fields.length - 1"
            :disabled-submit="idx !== fields.length - 1"
            :disabled-remove="fields.length === 1"
            @add="push({})"
            @remove="remove(idx)"
            :loading-submit="prompts.createState.isLoading()"
            mt-0.5rem
          />
        </div>
      </FieldArray>
    </SForm>
  </SComponentWrapper>
</template>
