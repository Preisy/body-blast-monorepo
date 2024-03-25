import { IListState, useSingleState } from '../state';
import { StoreAction, useStoreAction } from './action';

export namespace ListStoreAction {
  export interface Params<D, R = D> extends StoreAction.Params.Base<R> {
    stateWrapper: IListState<unknown, D>;
    id: string | number;
    delete?: boolean;
  }
}

export function useListStoreAction<T, R = T>({ stateWrapper, id, ...rest }: ListStoreAction.Params<T, R>) {
  if (!stateWrapper.items[id]) {
    stateWrapper.items[id] = useSingleState<T>({ delete: true });
  }

  return useStoreAction({
    state: stateWrapper.items[id][rest.delete ? 'deleteState' : 'state']!,
    ...rest,
  });
}
