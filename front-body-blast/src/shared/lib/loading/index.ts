import { Loading } from 'quasar';
import { WatchStopHandle } from 'vue';
import { ISingleState, IState } from '../utils';

export function useLoading(state: IState): { unwatch: WatchStopHandle };
export function useLoading(state: ISingleState): { unwatch: WatchStopHandle };

export function useLoading(state: XOR<IState, ISingleState>) {
  const unwatch = watchEffect(() => {
    if (state?.isLoading?.() || state.state?.isLoading?.()) {
      Loading.show();
    } else {
      Loading.hide();
    }
  });

  return { unwatch };
}

export function useLoadingAction(state: XOR<IState, ISingleState>, fn: (() => unknown) | (() => Promise<unknown>)) {
  const { unwatch } = useLoading(state.state ?? state);
  const result = fn();
  if (typeof result === 'object' && result !== null && 'then' in result && typeof result.then === 'function')
    result.then(unwatch);
  return { unwatch };
}
