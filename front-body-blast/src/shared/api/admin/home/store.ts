import { defineStore } from 'pinia';
import { AppPagination } from 'shared/api/base';
import { User } from 'shared/api/user';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminGetUsers, AdminPatchUser } from './types';

export const useAdminHomeStore = defineStore('admin-home-store', () => {
  const clientProfiles = ref(useSingleState<AdminGetUsers.Response>());
  const getUserProfiles = (data?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: clientProfiles.value,
      serviceAction: adminProfileService.getUsers(data),
    });

  const patchUserResponse = ref(useSingleState<AdminPatchUser.Response>());
  const patchUserProfile = (id: number | string, data: Partial<User>) =>
    useSimpleStoreAction({
      stateWrapper: patchUserResponse.value,
      serviceAction: adminProfileService.patchUser(id, data),
    });

  return {
    getUserProfiles,
    clientProfiles,
    patchUserProfile,
    patchUserResponse,
  };
});
