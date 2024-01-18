import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { Me } from './types';

export const MeService = {
  getMe: useServiceAction(() => api.get<Me.Response>('/me')),
};
