<script setup lang="ts">
import { FSearchPanel } from 'features/FSearchPanel';
import { EUnitedProfileCard } from 'entities/profile';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { useAuthStore } from 'shared/api/auth';
import { useMeStore } from 'shared/api/me';
import { User } from 'shared/api/user';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SRemoveDialog } from 'shared/ui/SRemoveDialog';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

const router = useRouter();

const { users, getUsers, user: storeUser, deleteUser } = useAdminUserProfileStore();
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

const { me, getMe, clear } = useMeStore();
const meData = computed(() => me.data?.data);
if (!meData.value && !me.state.isLoading()) useLoadingAction(me, getMe);
const myName = computed(() => meData.value?.firstName + ' ' + meData.value?.lastName);

const logout = () => {
  useAuthStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
  clear();
};

const onUserProfileClick = (user: User) => {
  storeUser.data = { data: user };
  router.push({ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE, params: { id: user.id } });
};

const deletionDialog = ref<InstanceType<typeof SRemoveDialog>>();
const userToDelete = ref<User>();
const onDeletionApply = () => {
  useLoadingAction(users.deleteState, () => {
    if (!userToDelete.value) return;
    deleteUser({ id: userToDelete.value.id });
  });
};
const onUserDelete = (user: User) => {
  userToDelete.value = user;
  deletionDialog.value?.show();
};
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          :header="myName ?? $t('global.loading')"
          :describe="$t('home.profile.header.admin')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <div flex flex-row>
              <SBtn icon="sym_r_logout" @click="logout" ml-auto />
            </div>
          </template>
        </EUnitedProfileCard>
      </template>
      <template #body>
        <FSearchPanel v-model:query="nameFilter" />

        <div v-if="users.state.isSuccess() || displayCards?.length">
          <div v-for="user in displayCards" :key="user.id" @click="onUserProfileClick(user)" cursor-pointer>
            <EUnitedProfileCard
              :header="user.firstName + ' ' + user.lastName"
              :describe="$t('home.profile.header.student')"
            >
              <template #action>
                <div flex flex-row justify-between>
                  <SBtn icon="sym_r_help" bg="bg!" @click="onUserProfileClick(user)" />
                  <SBtn icon="sym_r_delete" @click.stop="onUserDelete(user)" />
                </div>
              </template>
            </EUnitedProfileCard>
          </div>
        </div>

        <SNoResultsScreen v-else-if="users.state.isError()" />
      </template>
    </SWithHeaderLayout>

    <SRemoveDialog ref="deletionDialog" @apply="onDeletionApply" />
  </SStructure>
</template>
