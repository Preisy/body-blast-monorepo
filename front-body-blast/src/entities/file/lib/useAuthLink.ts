import { MaybeRefOrGetter } from 'vue';
import { useSingleState } from 'shared/lib/utils';
import { URLHandler, useFileStore } from '..';

export const useAuthLink = (link: MaybeRefOrGetter<string> | ComputedRef<string>) => {
  const fileStore = useFileStore();
  const state = ref(useSingleState<URLHandler>());

  watchEffect(() => {
    const videoFileName = computed(() => toValue(link).split('/').pop() || '');
    fileStore.getFileByName({ filename: videoFileName.value }, state.value);
  });
  onUnmounted(() => {
    state.value.data?.destructor();
  });

  return { state };
};
