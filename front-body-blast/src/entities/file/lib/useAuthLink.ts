import { MaybeRefOrGetter } from 'vue';
import { useSingleState } from 'shared/lib';
import { URLHandler, useFileStore } from '..';

export const useAuthLink = (link: MaybeRefOrGetter<string | undefined> | ComputedRef<string | undefined>) => {
  const fileStore = useFileStore();
  const state = ref(useSingleState<URLHandler>());

  watchEffect(() => {
    const linkValue = toValue(link);
    if (!linkValue) return;
    const videoFileName = computed(() => linkValue.split('/').pop() || '');
    fileStore.getFileByName({ filename: videoFileName.value }, state.value);
  });
  onUnmounted(() => {
    state.value.data?.destructor();
  });

  return { state };
};
