import { defineStore } from 'pinia';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { useSingleState, useSimpleStoreAction, useStoreAction, Notify } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminUser } from './types';

export const useAdminUserProfileStore = defineStore('admin-user-profile-store', () => {
  const users = ref(useSingleState<AdminUser.Get.Response>({ delete: true }));
  const getUsers = (data?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: users.value,
      serviceAction: adminProfileService.getUsers(data),
    });

  const user = ref(useSingleState<AdminUser.GetById.Response>({ update: true }));
  const getUserById = (data: AppBaseEntity.Dto) =>
    useSimpleStoreAction({
      stateWrapper: user.value,
      serviceAction: adminProfileService.getUserById(data),
    });

  const patchUserProfile = (data: AdminUser.Patch.Dto) =>
    useStoreAction({
      state: user.value.updateState,
      serviceAction: adminProfileService.patchUser(data),
      onSuccess: (res) => (user.value.data = res),
    });

  const deleteUser = (data: AdminUser.Delete.Dto) =>
    useStoreAction({
      state: users.value.deleteState,
      serviceAction: adminProfileService.deleteUser(data),
      onSuccess: (res) => {
        if (!res.status) return;
        const listData = users.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((user) => user.id === data.id);
        listData.splice(index, 1);
        Notify.deleteSuccess();
      },
    });

  const userDiaries = ref(useSingleState<AdminUser.GetDiaries.Response>());
  const getUserDiaries = (data: AdminUser.GetDiaries.Dto) =>
    useSimpleStoreAction({
      stateWrapper: userDiaries.value,
      serviceAction: adminProfileService.getUserDiaries(data),
    });

  const userSteps = ref(useSingleState<AdminUser.GetSteps.Response>());
  const getUserSteps = (data: AdminUser.GetSteps.Dto) =>
    useSimpleStoreAction({
      stateWrapper: userSteps.value,
      serviceAction: adminProfileService.getUserSteps(data),
    });

  return {
    user,
    users,
    getUserById,
    getUsers,
    patchUserProfile,
    userDiaries,
    getUserDiaries,
    userSteps,
    getUserSteps,
    deleteUser,
  };
});
