import { ISingleState } from '../state';
import { StoreAction, useStoreAction } from './action';

export namespace SimpleStoreAction {
  export interface Params<D> extends StoreAction.Params.Base<D> {
    stateWrapper: ISingleState<D>;
  }
}

export function useSimpleStoreAction<D>({ stateWrapper, onSuccess, ...rest }: SimpleStoreAction.Params<D>) {
  return useStoreAction<D>({
    state: stateWrapper.state,
    onSuccess: async (data) => {
      stateWrapper.data = data;
      await onSuccess?.(data);
    },
    ...rest,
  });
}
