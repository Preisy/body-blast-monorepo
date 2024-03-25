import { omit } from 'lodash';
import { IPagination, IResource } from '../http';
import { IListState } from '../state';
import { StoreAction, useStoreAction } from './action';

export namespace PaginationStoreAction {
  export interface Params<D, R extends IPagination.Res<D> = IPagination.Res<D>>
    extends Omit<StoreAction.Params.Base<R>, 'serviceAction'> {
    stateWrapper: IListState<D, unknown>;
    serviceAction: (params: IPagination.Params) => IResource.Future<R>;
    params?: IPagination.Params;
  }
}

export function usePaginationStoreAction<D>({
  params = {},
  stateWrapper,
  serviceAction,
  onSuccess,
  onError,
}: PaginationStoreAction.Params<D>) {
  const updatedPagination: IPagination<string> = {
    ...stateWrapper.pagination,
    ...params,
    totalPages: undefined!,
  };

  return useStoreAction({
    state: stateWrapper.state,
    serviceAction: serviceAction(updatedPagination),
    onSuccess: async (data) => {
      stateWrapper.data = data.content;
      stateWrapper.pagination = {
        ...updatedPagination,
        ...omit(data, ['content', 'size']),
      };
      await onSuccess?.(data);
    },
    onError,
  });
}

export function useChangePage(storeAction: (params: IPagination.Params) => Promise<unknown>, scrollUp?: true) {
  return (page: number) =>
    storeAction({ page }).then(() => scrollUp && window.scrollTo({ top: 0, behavior: 'smooth' }));
}

export function useChangeSort(storeAction: (params: IPagination.Params) => Promise<IResource>) {
  return (sort: IPagination.Sort) => storeAction(sort);
}
