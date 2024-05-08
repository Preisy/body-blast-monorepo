import { defineStore } from 'pinia';
import { AppBaseEntity } from 'shared/api';
import { AppPagination } from 'shared/api';
import { useSingleState, useSimpleStoreAction, useStoreAction, Notify } from 'shared/lib/utils';
import { AdminUser, adminUserService } from '.';

export const useAdminUserStore = defineStore('admin-user-profile-store', () => {
  const users = ref(useSingleState<AdminUser.Get.Response>({ delete: true }));
  const getUsers = (data?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: users.value,
      serviceAction: adminUserService.getUsers(data),
    });

  const user = ref(useSingleState<AdminUser.GetById.Response>({ update: true }));
  const getUserById = (data: AppBaseEntity.Dto) =>
    useSimpleStoreAction({
      stateWrapper: user.value,
      serviceAction: adminUserService.getUserById(data),
    });

  const patchUserProfile = (data: AdminUser.Patch.Dto) =>
    useStoreAction({
      state: user.value.updateState,
      serviceAction: adminUserService.patchUser(data),
      onSuccess: (res) => (user.value.data = res),
    });

  const deleteUser = (data: AdminUser.Delete.Dto) =>
    useStoreAction({
      state: users.value.deleteState,
      serviceAction: adminUserService.deleteUser(data),
      onSuccess: (res) => {
        if (!res.status) return;
        const listData = users.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((user) => user.id === data.id);
        listData.splice(index, 1);
        Notify.deleteSuccess();
      },
    });

  const userSteps = ref(useSingleState<AdminUser.GetSteps.Response>());
  const getUserSteps = (data: AdminUser.GetSteps.Dto) =>
    useSimpleStoreAction({
      stateWrapper: userSteps.value,
      serviceAction: adminUserService.getUserSteps(data),
    });

  return {
    user,
    users,
    getUserById,
    getUsers,
    patchUserProfile,
    userSteps,
    getUserSteps,
    deleteUser,
  };
});
