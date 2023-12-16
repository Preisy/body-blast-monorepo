import { keys } from 'lodash';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';

function buildEndpoint<T>(endpoint: string, params: T) {
  const result = endpoint + '?';
  for (const key of keys(params)) {
    const param = params[key as keyof T];
    if (param !== undefined) result.concat(`${key}=${param}&`);
  }
  result.slice(0, -1); //remove &

  return result;
}

export function basePaginationRequest(
  endpoint: string,
  params: AppPagination.BaseDto = { page: undefined, limit: undefined, expanded: false },
) {
  return buildEndpoint(endpoint, params);
}

export function datePaginationRequest(
  endpoint: string,
  params: AppPagination.DateDto = { from: undefined, to: undefined, expanded: false },
) {
  return buildEndpoint(endpoint, params);
}

export function baseRequest(endpoint: string, params: AppBaseEntity.Dto) {
  return buildEndpoint(endpoint, params);
}
