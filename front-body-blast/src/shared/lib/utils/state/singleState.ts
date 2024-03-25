import { useState, type IState } from './state';

export interface ISingleState<T = unknown> {
  data: Nullable<T>;
  state: IState;
  createState?: IState;
  updateState?: IState;
  deleteState?: IState;
}

export namespace ISingleState {
  type TState = boolean | IState.Simple;

  export interface P<T> {
    data?: T;
    state?: IState.Simple;
    create?: TState;
    update?: TState;
    delete?: TState;
  }

  export namespace P {
    export type Base<T> = Omit<P<T>, 'create' | 'update' | 'delete'>;
    export type Create<T> = Omit<P<T>, 'update' | 'delete'>;
    export type Update<T> = Omit<P<T>, 'create' | 'delete'>;
    export type Delete<T> = Omit<P<T>, 'create' | 'update'>;
    export type CreateUpdate<T> = Omit<P<T>, 'delete'>;
    export type CreateDelete<T> = Omit<P<T>, 'update'>;
    export type UpdateDelete<T> = Omit<P<T>, 'create'>;
    export type All<T> = P<T>;
  }

  export namespace R {
    export type Base<T> = Required<Omit<ISingleState<T>, 'createState' | 'updateState' | 'deleteState'>>;
    export type Create<T> = Required<Omit<ISingleState<T>, 'updateState' | 'deleteState'>>;
    export type Update<T> = Required<Omit<ISingleState<T>, 'createState' | 'deleteState'>>;
    export type Delete<T> = Required<Omit<ISingleState<T>, 'createState' | 'updateState'>>;
    export type CreateUpdate<T> = Required<Omit<ISingleState<T>, 'deleteState'>>;
    export type CreateDelete<T> = Required<Omit<ISingleState<T>, 'updateState'>>;
    export type UpdateDelete<T> = Required<Omit<ISingleState<T>, 'createState'>>;
    export type All<T> = Required<ISingleState<T>>;
  }
}

export function useSingleState<T = unknown>(params?: ISingleState.P.Base<T>): ISingleState.R.Base<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.Create<T>): ISingleState.R.Create<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.Update<T>): ISingleState.R.Update<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.Delete<T>): ISingleState.R.Delete<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.CreateUpdate<T>): ISingleState.R.CreateUpdate<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.CreateDelete<T>): ISingleState.R.CreateDelete<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.UpdateDelete<T>): ISingleState.R.UpdateDelete<T>;
export function useSingleState<T = unknown>(params?: ISingleState.P.All<T>): ISingleState.R.All<T>;
export function useSingleState<T = unknown>({
  data,
  state,
  create,
  update,
  delete: remove,
}: ISingleState.P<T> = {}): ISingleState<T> {
  const singleState: ISingleState<T> = {
    data: data ?? null,
    state: useState(state),
  };

  if (create) singleState.createState = useState(typeof create === 'string' ? create : undefined);
  if (update) singleState.updateState = useState(typeof update === 'string' ? update : undefined);
  if (remove) singleState.deleteState = useState(typeof remove === 'string' ? remove : undefined);

  return singleState;
}
