<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { useAdminFileStore } from 'entities/file';
import { BonusVideo, useAdminBonusVideoStore } from 'entities/learning';
import { SListControls, SForm, SInput, SFilePicker, SComponentWrapper } from 'shared/ui';

const { t } = useI18n();
const schema = toTypedSchema(BonusVideo.validation(t));
const { postVideo, videoList } = useAdminBonusVideoStore();
const form = ref<InstanceType<typeof SForm>>();

const resetForm = () => {
  form.value?.resetForm();
};

const onsubmit = async (values: z.infer<ReturnType<typeof BonusVideo.validation>>) => {
  videoList.createState.loading();
  const { postFile } = useAdminFileStore();
  const response = await postFile({ file: values.video });
  if (!response.data) {
    console.error(response.error);
    return;
  }

  const res = await postVideo({
    name: values.name,
    videoLink: response.data.link,
  });
  if (res?.error) {
    console.error(res.error);
    return;
  }
  resetForm();
};
</script>

<template>
  <SComponentWrapper flex flex-col gap-y-1rem>
    <h1>{{ $t('admin.video.header') }}</h1>
    <div>
      <SForm ref="form" @submit="onsubmit" :field-schema="schema" p="0!" mb-0.5rem>
        <SInput name="name" :label="$t('admin.video.name')" />
        <SFilePicker name="video" :label="$t('admin.video.video')" accept=".mp4" />

        <template #submit-btn>
          <SListControls
            :disabled-add="true"
            @remove="resetForm"
            :loading-submit="videoList.createState.isLoading()"
            mt-0.5rem
          />
        </template>
      </SForm>
    </div>
  </SComponentWrapper>
</template>
