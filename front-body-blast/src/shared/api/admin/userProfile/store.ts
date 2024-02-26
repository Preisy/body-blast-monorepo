import { defineStore } from 'pinia';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { User } from 'shared/api/user';
import { useSingleState, useSimpleStoreAction } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminUser } from './types';

export const useAdminUserProfileStore = defineStore('admin-userProfile-store', () => {
  const currentUser = ref<User>();
  const setCurrentUser = (newVal: User) => (currentUser.value = newVal);

  const users = ref(useSingleState<AdminUser.Get.Response>());
  const getUsers = (data?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: users.value,
      serviceAction: adminProfileService.getUsers(data),
    });

  const user = ref(useSingleState<AdminUser.GetById.Response>());
  const getUserById = (data: AppBaseEntity.Dto) =>
    useSimpleStoreAction({
      stateWrapper: user.value,
      serviceAction: adminProfileService.getUserById(data),
    });

  const patchUserProfileResponse = ref(useSingleState<AdminUser.Patch.Response>());
  const patchUserProfile = (data: AdminUser.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchUserProfileResponse.value,
      serviceAction: adminProfileService.patchUser(data),
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
    currentUser,
    setCurrentUser,
    getUsers,
    patchUserProfile,
    patchUserProfileResponse,
    userDiaries,
    getUserDiaries,
    userSteps,
    getUserSteps,
  };
});
