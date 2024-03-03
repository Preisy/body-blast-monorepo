import { defineStore } from 'pinia';
import { AppPagination } from 'shared/api/pagination';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AdminWorkoutService } from './service';
import { Workout as AdminWorkout } from './types';

export const useAdminWorkoutStore = defineStore('admin-workout-store', () => {
  const postWorkoutResponse = ref(useSingleState<AdminWorkout.Post.Response>());
  // POST /api/admin/workout
  const postWorkout = (data: AdminWorkout.Post.Dto) =>
    useSimpleStoreAction({
      stateWrapper: postWorkoutResponse.value,
      serviceAction: AdminWorkoutService.postWorkout(data),
    });

  const getWorkoutByIdResponse = ref(useSingleState<AdminWorkout.GetById.Response>());
  // GET /api/admin/workouts/{id}
  const getWorkoutById = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: getWorkoutByIdResponse.value,
      serviceAction: AdminWorkoutService.getWorkoutById(id),
    });

  const getWorkoutsResponse = ref(useSingleState<AdminWorkout.Get.Response>());
  // GET /api/admin/workouts
  const getWorkouts = (data: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: getWorkoutsResponse.value,
      serviceAction: AdminWorkoutService.getWorkout(data),
    });

  const patchWorkoutResponse = ref(useSingleState<AdminWorkout.Patch.Response>());
  // PATCH /api/admin/workouts/{id}
  const patchWorkout = (id: number, data: AdminWorkout.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchWorkoutResponse.value,
      serviceAction: AdminWorkoutService.patchWorkout(id, data),
    });

  const deleteWorkoutResponse = ref(useSingleState<AdminWorkout.Delete.Response>());
  // DELETE /api/admin/workouts/{id}
  const deleteWorkout = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: deleteWorkoutResponse.value,
      serviceAction: AdminWorkoutService.deleteWorkout(id),
    });

  return {
    postWorkoutResponse,
    postWorkout,
    getWorkoutByIdResponse,
    getWorkoutById,
    getWorkoutsResponse,
    getWorkouts,
    patchWorkoutResponse,
    patchWorkout,
    deleteWorkoutResponse,
    deleteWorkout,
  };
});
