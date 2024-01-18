import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp, Refresh, Logout } from './types';

export const authService = {
  login: useServiceAction((data: Auth.Dto) => api.post<Auth.Response>('/auth/login', data)),
  refresh: useServiceAction((data: Refresh.Dto) => api.post<Refresh.Response>(`/auth/refresh`, data)),
  logout: useServiceAction(() => api.post<Logout.Response>(`/auth/logout`)),
  signUp: useServiceAction((data: Partial<SignUp.Dto>) => api.post<SignUp.Response>('/auth/signup', data)),
};
