<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { WAthropometrics } from 'widgets/profile/WAthropometrics';
import { EProfileHeader } from 'entities/profile/EProfileHeader';
import { useMeStore } from 'shared/api/me';
import { useLoadingAction } from 'shared/lib/loading';
import { SStructure } from 'shared/ui/SStructure';

const { t } = useI18n();

const { me, getMe } = useMeStore();
const meData = computed(() => me.data?.data);
if (!meData.value) useLoadingAction(me, getMe);

const userName = computed(() =>
  meData.value?.firstName && meData.value?.lastName
    ? `${meData.value.firstName} ${meData.value.lastName}`
    : t('global.loading'),
);
</script>

<template>
  <SStructure h-full>
    <EProfileHeader :user-name="userName" />
    <WAthropometrics mt-1.75rem />
  </SStructure>
</template>
