import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AppPagination } from '../pagination';
import { WorkoutsService } from './service';
import { Workout } from './types';

export const useWorkoutStore = defineStore('workout-store', () => {
  const getWorkoutsResponse = ref(useSingleState<Workout.Get.Response>());
  const getWorkouts = (pagination?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: getWorkoutsResponse.value,
      serviceAction: WorkoutsService.getTrainings(pagination),
    });

  return { getWorkoutsResponse, getWorkouts };
});
