import { assign } from 'lodash';
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
      onSuccess: (res) => {
        const listData = workouts.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((workout) => workout.id === data.id);
        if (index === -1) return;

        assign(listData[index], res.data);
      },
    });

  return { workouts, getWorkouts, patchWorkout };
});
