<script setup lang="ts">
import { FSearchPanel } from 'features/FSearchPanel';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { useAuthStore } from 'shared/api/auth';
import { useMeStore } from 'shared/api/me';
import { User } from 'shared/api/user';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminHomeProps {}
defineProps<PAdminHomeProps>();

const router = useRouter();

const { users, getUsers, user: storeUser } = useAdminUserProfileStore();
useLoadingAction(users, getUsers);

const nameFilter = ref<string>('');
const displayCards = computed(
  () =>
    users.data?.data.filter((card) => {
      const fullName = `${card.firstName} ${card.lastName}`;
      const searchFilter = fullName.toLocaleLowerCase().includes(nameFilter.value.toLocaleLowerCase());
      const roleUserFilter = card.role === 'client';
      return searchFilter && roleUserFilter;
    }),
);

const { me, getMe } = useMeStore();
useLoadingAction(me, getMe);
const myName = computed(() => me.data?.data.firstName + ' ' + me.data?.data.lastName);

const edit = () => {
  //TODO:
  console.log('onedit click');
};
const logout = () => {
  useAuthStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
};

const onUserProfileClick = (user: User) => {
  storeUser.data = { data: user };
  router.push({ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE, params: { id: user.id } });
};
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          :header="myName ?? 'Loading...'"
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

        <div v-if="users.state.isSuccess() || displayCards?.length">
          <EUnitedProfileCard
            v-for="user in displayCards"
            :key="user.id"
            :header="user.firstName + ' ' + user.lastName"
            :describe="$t('home.profile.header.student')"
          >
            <template #action>
              <div flex flex-row justify-between>
                <SBtn icon="sym_r_help" bg="bg!" @click="() => onUserProfileClick(user)" />
                <SBtn icon="sym_r_delete" />
              </div>
            </template>
          </EUnitedProfileCard>
        </div>

        <SNoResultsScreen v-else-if="users.state.isError()" />
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
