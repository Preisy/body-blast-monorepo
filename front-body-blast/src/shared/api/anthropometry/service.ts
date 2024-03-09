import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AppPagination } from '../pagination';
import { Anthropometry } from './types';

export const anthropometryService = {
  getAnthropometry: useServiceAction((params: Partial<AppPagination.DateDto>) =>
    api.get<Anthropometry.Response>(`/anthropometrics`, { params }),
  ),
};
