import { ListStoreAction, useListStoreAction } from './listAction';

export namespace SimpleListStoreAction {
  export type Params<D extends { id: string | number }> = ListStoreAction.Params<D>;
}

export function useSimpleListStoreAction<D extends { id: string | number }>({
  stateWrapper,
  onSuccess,
  ...rest
}: SimpleListStoreAction.Params<D>) {
  return useListStoreAction<D>({
    stateWrapper,
    onSuccess: async (data) => {
      stateWrapper.items[data.id].data = data;
      await onSuccess?.(data);
    },
    ...rest,
  });
}
