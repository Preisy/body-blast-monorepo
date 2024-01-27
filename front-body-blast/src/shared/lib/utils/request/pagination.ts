import { keys } from 'lodash';
import { AppPagination } from 'shared/api/pagination';

function buildEndpoint<T>(endpoint: string, params: T) {
  let result = endpoint + '?';
  for (const key of keys(params)) {
    const param = params[key as keyof T];
    if (param !== undefined) result = result.concat(`${key}=${param}&`);
  }
  result = result.slice(0, -1); //remove &

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

export function baseRequest(endpoint: string, id: number) {
  return endpoint.endsWith('/') ? `${endpoint}${id}` : `${endpoint}/${id}`;
}
