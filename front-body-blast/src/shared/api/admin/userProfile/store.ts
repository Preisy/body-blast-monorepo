import { defineStore } from 'pinia';
import { User } from 'shared/api/user';

export const useAdminUserProfileStore = defineStore('admin-userProfile-store', () => {
  const currentUser = ref<User>();
  const setCurrentUser = (newVal: User) => (currentUser.value = newVal);

  return {
    currentUser,
    setCurrentUser,
  };
});
