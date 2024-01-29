<script setup lang="ts">
import { FSearchPanel } from 'features/FSearchPanel';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { useMeStore } from 'shared/api/me';
import { ENUMS } from 'shared/lib/enums';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminProfileProps {}
defineProps<PAdminProfileProps>();

const profileStore = useAdminProfileStore();
const { clientProfiles } = profileStore;
useLoading(clientProfiles);
profileStore.getUserProfiles({ page: 1, limit: 1000, expanded: false });

const nameFilter = ref<string>('');
const cards = computed(
  () =>
    clientProfiles.data?.data.filter((card) => {
      const fullName = `${card.firstName} ${card.lastName}`;
      const searchFilter = fullName.toLocaleLowerCase().includes(nameFilter.value.toLocaleLowerCase());
      const roleUserFilter = card.role === 'client';
      return searchFilter && roleUserFilter;
    }),
);

const { me, getMe } = useMeStore();
useLoading(me);
if (!me.data) getMe();
const myName = computed(() =>
  me.state.isLoading() ? 'Loading...' : me.data?.data.firstName + ' ' + me.data?.data.lastName,
);

const edit = () => {
  console.log('onedit click');
};
const logout = () => {
  console.log('logout click');
};
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          :header="myName"
          :describe="$t('home.profile.header.admin')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <SBtn icon="sym_r_edit" @click="edit" bg="bg!" />
            <SBtn icon="sym_r_logout" @click="logout" float-right />
          </template>
        </EUnitedProfileCard>
      </template>
      <template #body>
        <FSearchPanel v-model:query="nameFilter" />

        <div v-if="clientProfiles.state.isSuccess() || cards?.length">
          <EUnitedProfileCard
            v-for="user in cards"
            :key="user.id"
            :header="user.firstName + ' ' + user.lastName"
            :describe="$t('home.profile.header.student')"
          >
            <template #action>
              <div flex flex-row justify-between>
                <SBtn
                  icon="sym_r_help"
                  bg="bg!"
                  :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE, params: { id: user.id } }"
                />
                <SBtn icon="sym_r_delete" />
              </div>
            </template>
          </EUnitedProfileCard>
        </div>

        <SNoResultsScreen v-else-if="clientProfiles.state.isError()" />
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
