<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { WAthropometrics } from 'widgets/profile/';
import { EProfileHeader } from 'entities/profile';
import { useMeStore } from 'shared/api/me';
import { useLoadingAction } from 'shared/lib/loading';
import { SStructure } from 'shared/ui/structure';

const { t } = useI18n();

const { me, getMe } = useMeStore();
const meData = computed(() => me.data?.data);
if (!meData.value && !me.state.isLoading()) useLoadingAction(me, getMe);

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
