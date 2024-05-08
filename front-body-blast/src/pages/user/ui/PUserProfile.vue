<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { WUserAthropometrics } from 'widgets/user';
import { FUserLogoutBtn } from 'features/user';
import { EProfileHeader } from 'entities/user';
import { useUserStore } from 'shared/api';
import { useLoadingAction } from 'shared/lib/loading';
import { SStructure } from 'shared/ui/structure';

const { t } = useI18n();

const { user, getUser } = useUserStore();
const userData = computed(() => user.data?.data);
if (!userData.value && !user.state.isLoading()) useLoadingAction(user, getUser);

const userName = computed(() =>
  userData.value?.firstName && userData.value?.lastName
    ? `${userData.value.firstName} ${userData.value.lastName}`
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
