import { Loading } from 'quasar';
import { WatchStopHandle } from 'vue';
import { ISingleState, IState } from '../utils';

export function useLoading(state: IState): WatchStopHandle;
export function useLoading(state: ISingleState): WatchStopHandle;

export function useLoading(state: XOR<IState, ISingleState>) {
  const unwatch = watchEffect(() => {
    if (state?.isLoading?.() || state.state?.isLoading?.()) {
      Loading.show();
    } else {
      Loading.hide();
    }
  });

  return unwatch;
}

export async function useLoadingAction(
  state: XOR<IState, ISingleState>,
  fn: (() => unknown) | (() => Promise<unknown>),
) {
  const unwatch = useLoading(state.state ?? state);
  await fn();
  unwatch();
  return unwatch;
}
