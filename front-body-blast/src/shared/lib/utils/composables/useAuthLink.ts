import { URLHandler, useFileStore } from 'shared/api/file';
import { useLoadingAction } from 'shared/lib/loading';
import { useSingleState } from 'shared/lib/utils';

export const useAuthLink = (link: string) => {
  const fileStore = useFileStore();
  const state = ref(useSingleState<URLHandler>());
  const videoFileName = link.split('/').pop() || '';

  useLoadingAction(state.value, () => fileStore.getFileByName({ filename: videoFileName }, state.value));

  return state.value;
};
