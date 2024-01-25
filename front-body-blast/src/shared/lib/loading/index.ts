import { Loading } from 'quasar';
import { ISingleState, IState } from '../utils';

export function useLoading(state: IState): void;
export function useLoading(state: ISingleState): void;

export function useLoading(state: XOR<IState, ISingleState>) {
  watch(
    state,
    (changedState) =>
      changedState.state?.isLoading?.() || changedState?.isLoading?.() ? Loading.show() : Loading.hide(),
    { immediate: true },
  );
}

export function useLoadingAction(state: XOR<IState, ISingleState>, fn: () => void) {
  useLoading(state.state ?? state);
  fn();
}
