import { keys } from 'lodash';
import { AppPagination } from 'shared/api/base';

export function BasePaginationRequest(
  endpoint: string,
  params: AppPagination.BaseDto = { page: undefined, limit: undefined, expanded: false },
) {
  const result = endpoint + '?';
  for (const key of keys(params)) {
    const param = params[key as keyof AppPagination.BaseDto];
    if (param !== undefined) result.concat(`${key}=${param}&`);
  }
  result.slice(0, -1); //remove &

  return result;
}

export function DatePaginationRequest(
  endpoint: string,
  params: AppPagination.DateDto = { from: undefined, to: undefined, expanded: false },
) {
  const result = endpoint + '?';
  for (const key of keys(params)) {
    const param = params[key as keyof AppPagination.DateDto];
    if (param !== undefined) result.concat(`${key}=${param}&`);
  }
  result.slice(0, -1); //remove &

  return result;
}
