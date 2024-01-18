import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { TrainingsService } from './service';
import { Addition, Training } from './types';

export const useTrainingStore = defineStore('training-store', () => {
  const trainings = ref(useSingleState<Training.Response.Expanded>());
  const getTrainings = (page: number, limit: number) =>
    useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: TrainingsService.getExpandedTrainings({ page, limit }),
    });

  const additionRequestState = ref(useSingleState<Addition.Response>());
  const sendAddition = (data: Addition.Dto) =>
    useSimpleStoreAction({
      stateWrapper: additionRequestState.value,
      serviceAction: TrainingsService.postAddition(data),
    });

  return { trainings, getTrainings, additionRequestState, sendAddition };
});
