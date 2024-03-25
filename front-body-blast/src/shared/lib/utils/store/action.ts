import type { IResource } from '../http';
import { IState } from '../state';

export namespace StoreAction {
  export interface Params<D> extends Params.Base<D> {
    state: IState;
  }

  export type Callback<D> = (res: D) => unknown;

  export namespace Params {
    export interface Base<D> {
      serviceAction: IResource.Future<D>;
      onSuccess?: Callback<D>;
      onError?: Callback<IResource.Error>;
    }
  }
}

export async function useStoreAction<D>({ state, serviceAction, onError, onSuccess }: StoreAction.Params<D>) {
  state.loading();
  const resource = await serviceAction;
  if (resource.error) {
    state.error();
    await onError?.(resource.error);
    return resource;
  }
  await onSuccess?.(resource.data);
  state.success();
  return resource;
}
