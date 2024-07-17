<script setup lang="ts">
import { EMinifiedProfileCard, EProfileCard } from 'entities/user';
import { useUserStore, useAdminUserStore, User } from 'shared/api';
import { ENUMS, useLoadingAction } from 'shared/lib';
import { SSearchInput, SConfirmDialog, SBtn, SNoResultsScreen, SScaffold, SStructure } from 'shared/ui';

const router = useRouter();

const { users, getUsers, user: storeUser, deleteUser } = useAdminUserStore();
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

const { user, getUser, clear } = useUserStore();
const userData = computed(() => user.data?.data);
if (!userData.value && !user.state.isLoading()) useLoadingAction(user, getUser);
const myName = computed(() => userData.value?.firstName + ' ' + userData.value?.lastName);

const logout = () => {
  useUserStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
  clear();
};

const onUserProfileClick = (user: User) => {
  storeUser.data = { data: user };
  router.push({ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE, params: { id: user.id } });
};

const isConfirmDialogShown = ref<boolean>();
const userToDelete = ref<User>();
const onDeletionApply = () => {
  useLoadingAction(users.deleteState, () => {
    if (!userToDelete.value) return;
    deleteUser({ id: userToDelete.value.id });
  });
};
const onUserDelete = (user: User) => {
  userToDelete.value = user;
  isConfirmDialogShown.value = true;
};
</script>

<template>
  <SStructure h-full>
    <SScaffold>
      <template #header>
        <EMinifiedProfileCard
          :header="myName ?? $t('global.loading')"
          :describe="$t('home.profile.header.admin')"
          dark
          mx--0.5rem
        >
          <template #action>
            <div flex flex-row>
              <SBtn icon="sym_r_logout" @click="logout" ml-auto />
            </div>
          </template>
        </EMinifiedProfileCard>
      </template>
      <template #body>
        <SSearchInput v-model:query="nameFilter" />

        <div v-if="users.state.isSuccess() || displayCards?.length">
          <div v-for="userCard in displayCards" :key="userCard.id" @click="onUserProfileClick(userCard)" cursor-pointer>
            <EProfileCard
              :header="userCard.firstName + ' ' + userCard.lastName"
              :describe="$t('home.profile.header.student')"
            >
              <template #action>
                <div flex flex-row justify-between>
                  <SBtn icon="sym_r_help" bg="bg!" @click="onUserProfileClick(userCard)" />
                  <SBtn icon="sym_r_delete" @click.stop="onUserDelete(userCard)" />
                </div>
              </template>
            </EProfileCard>
          </div>
        </div>

        <SNoResultsScreen v-else-if="users.state.isError()" />
      </template>
    </SScaffold>

    <SConfirmDialog v-model="isConfirmDialogShown" @confirm="onDeletionApply" type="deletion" />
  </SStructure>
</template>
