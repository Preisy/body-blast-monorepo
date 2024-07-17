import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib';
import { Auth, Logout, Refresh, SignUp, User } from '.';

export const UserService = {
  getUser: useServiceAction(() => api.get<User.Get.Response>('/me')),
  patchUser: useServiceAction((data: User.Patch.Dto) => api.patch<User.Patch.Response>('/me', data)),
  login: useServiceAction((data: Auth.Dto) => api.post<Auth.Response>('/auth/login', data)),
  refresh: useServiceAction((data: Refresh.Dto) => api.post<Refresh.Response>(`/auth/refresh`, data)),
  logout: useServiceAction(() => api.post<Logout.Response>(`/auth/logout`)),
  signUp: useServiceAction((data: Partial<SignUp.Dto>) => api.post<SignUp.Response>('/auth/signup', data)),
};
