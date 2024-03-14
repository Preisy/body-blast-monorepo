import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import { IState } from '../utils';

type QueueInfer = IState | Promise<unknown>;
export const useLoadingStore = defineStore('loading-store', () => {
  const loadingQueue = reactive<Array<QueueInfer>>([]);

  //TODO instanceof vs 'then' in
  const getCompletedStates = () => loadingQueue.filter((el) => ('then' in el ? false : !el.isLoading()));

  watch(getCompletedStates, (newValue) => {
    newValue.forEach(pop);
  });

  const push = (element: QueueInfer): QueueInfer => {
    if (loadingQueue.includes(element)) return element;
    if (!Loading.isActive) Loading.show();
    if ('then' in element) {
      return element.finally(() => pop(element));
    }
    loadingQueue.push(element);
    return element;
  };

  const pop = (element: QueueInfer): QueueInfer => {
    const spliced = loadingQueue.splice(
      loadingQueue.findIndex((el) => el === element),
      1,
    )[0];

    if (!loadingQueue.length) Loading.hide();

    return spliced;
  };

  return { loadingQueue, push, pop };
});
