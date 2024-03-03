import { defineStore } from 'pinia';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { useSingleState, useSimpleStoreAction, useStoreAction } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminUser } from './types';

export const useAdminUserProfileStore = defineStore('admin-user-profile-store', () => {
  const users = ref(useSingleState<AdminUser.Get.Response>());
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
  };
});
