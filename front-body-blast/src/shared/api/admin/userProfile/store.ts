import { defineStore } from 'pinia';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { User } from 'shared/api/user';
import { useSingleState, useSimpleStoreAction } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminGetUsers, AdminPatchUser, AdminGetUser } from './types';

export const useAdminUserProfileStore = defineStore('admin-userProfile-store', () => {
  const currentUser = ref<User>();
  const setCurrentUser = (newVal: User) => (currentUser.value = newVal);

  const clientProfiles = ref(useSingleState<AdminGetUsers.Response>());
  const getUserProfiles = (data?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: clientProfiles.value,
      serviceAction: adminProfileService.getUsers(data),
    });

  const getUserProfileResponse = ref(useSingleState<AdminGetUser.Response>());
  const getUserProfile = (data: AppBaseEntity.Dto) =>
    useSimpleStoreAction({
      stateWrapper: getUserProfileResponse.value,
      serviceAction: adminProfileService.getUser(data),
    });

  const patchUserResponse = ref(useSingleState<AdminPatchUser.Response>());
  const patchUserProfile = (id: number | string, data: Partial<User>) =>
    useSimpleStoreAction({
      stateWrapper: patchUserResponse.value,
      serviceAction: adminProfileService.patchUser(id, data),
    });

  return {
    getUserProfileResponse,
    getUserProfile,
    currentUser,
    setCurrentUser,
    clientProfiles,
    getUserProfiles,
    patchUserResponse,
    patchUserProfile,
  };
});
