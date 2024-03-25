import { IPagination } from '../http';
import { ISingleState } from './singleState';
import { IState, useState } from './state';

export interface IListState<L = unknown, I = L> extends Omit<ISingleState<L[]>, 'updateState' | 'deleteState'> {
  data: L[];
  pagination: IPagination;
  items: Record<string | number, ISingleState<I>>;
}

export namespace IListState {
  type TState = true | IState.Simple;

  export interface P<L = unknown, I = L> extends Partial<Pick<IListState<L, I>, 'data' | 'items'>> {
    state?: IState.Simple;
    pagination?: Partial<IPagination.Params>;
    create?: TState;
  }

  export namespace P {
    export type Base<L, I> = Omit<P<L, I>, 'create'>;
    export type Create<L, I> = P<L, I>;
  }

  export namespace R {
    export type Base<L, I> = Required<Omit<IListState<L, I>, 'createState'>>;
    export type Create<L, I> = Required<IListState<L, I>>;
  }
}

export function useListState<L = unknown, I = L>(params?: IListState.P.Base<L, I>): IListState.R.Base<L, I>;
export function useListState<L = unknown, I = L>(params?: IListState.P.Create<L, I>): IListState.R.Create<L, I>;
export function useListState<L = unknown, I = L>({
  data,
  state,
  pagination,
  items,
  create,
}: IListState.P<L, I> = {}): IListState<L, I> {
  const listState: IListState<L, I> = {
    data: data ?? [],
    state: useState(state),
    pagination: { page: 1, size: 15, totalPages: 1, ...pagination },
    items: items ?? {},
  };

  if (create) listState.createState = useState(typeof create === 'string' ? create : undefined);

  return listState;
}
