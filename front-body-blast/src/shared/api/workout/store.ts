import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { WorkoutsService } from './service';
import { Workout } from './types';

export const useWorkoutStore = defineStore('workout-store', () => {
  const workouts = ref(useSingleState<Workout.Get.Response>({ update: true }));
  const getWorkouts = (pagination?: Workout.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: workouts.value,
      serviceAction: WorkoutsService.getWorkouts(pagination),
    });

  const patchWorkout = (data: Workout.Patch.Dto) =>
    useStoreAction({
      state: workouts.value.updateState,
      serviceAction: WorkoutsService.patchWorkout(data),
    });

  return { workouts, getWorkouts, patchWorkout };
});
