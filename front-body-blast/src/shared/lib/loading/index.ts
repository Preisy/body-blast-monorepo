import { ISingleState, IState } from '../utils';
import { useLoadingStore } from './store';

function useLoading(state: IState): { state: IState };
function useLoading(state: ISingleState): { state: ISingleState };

function useLoading(state: XOR<IState, ISingleState>) {
  const { push } = useLoadingStore();
  push(state.state ?? state);
  return { state };
}

export function useLoadingAction(state: XOR<IState, ISingleState>, fn: (() => unknown) | (() => Promise<unknown>)) {
  useLoading(state.state ?? state);
  fn();
  return { state };
}

export function useLoadingImport(asyncFn: () => Promise<unknown>): () => Promise<unknown> {
  return () => {
    const { push } = useLoadingStore();
    return push(asyncFn()) as Promise<unknown>;
  };
}
