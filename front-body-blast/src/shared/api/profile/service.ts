import { api } from 'shared/config';
import { useServiceAction, DatePaginationRequest } from 'shared/lib/utils';
import { AppPagination } from '../base';
import { Anthropometry } from './types';

export const profileService = {
  getAnthropometry: useServiceAction((params: Partial<AppPagination.DateDto>) =>
    api.get<Anthropometry.Response>(DatePaginationRequest(`/admin/anthropometrics`, params)),
  ),
};
