<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { WUserAthropometrics } from 'widgets/user';
import { FUserLogoutBtn } from 'features/user';
import { EProfileHeader } from 'entities/user';
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
    <EProfileHeader :user-name="userName">
      <template #logout>
        <FUserLogoutBtn />
      </template>
    </EProfileHeader>
    <WUserAthropometrics mt-1.75rem />
  </SStructure>
</template>
