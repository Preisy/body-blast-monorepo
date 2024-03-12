import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { AdminWorkoutService } from './service';
import { Workout as AdminWorkout } from './types';

export const useAdminWorkoutStore = defineStore('admin-workout-store', () => {
  const workoutList = ref(useSingleState<AdminWorkout.Get.Response>({ create: true, update: true, delete: true }));
  // GET /api/admin/workouts
  const getWorkouts = (data: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: workoutList.value,
      serviceAction: AdminWorkoutService.getWorkout(data),
    });

  const workout = ref(useSingleState<AdminWorkout.GetById.Response>());
  // GET /api/admin/workouts/{id}
  const getWorkoutById = (id: AppBaseEntity['id']) =>
    useSimpleStoreAction({
      stateWrapper: workout.value,
      serviceAction: AdminWorkoutService.getWorkoutById(id),
    });

  // POST /api/admin/workout
  const postWorkout = (data: AdminWorkout.Post.Dto) =>
    useStoreAction({
      state: workoutList.value.createState,
      serviceAction: AdminWorkoutService.postWorkout(data),
      onSuccess: (res) => {
        const listData = workoutList.value.data?.data;
        if (!listData) return;

        listData.push(res.data);
      },
    });

  // PATCH /api/admin/workouts/{id}
  const patchWorkout = (id: AppBaseEntity['id'], data: AdminWorkout.Patch.Dto) =>
    useStoreAction({
      state: workoutList.value.updateState,
      serviceAction: AdminWorkoutService.patchWorkout(id, data),
      onSuccess: (res) => {
        const listData = workoutList.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((workout) => workout.id === id);
        assign(listData[index], res.data);
      },
    });

  // DELETE /api/admin/workouts/{id}
  const deleteWorkout = (id: AppBaseEntity['id']) =>
    useStoreAction({
      state: workoutList.value.deleteState,
      serviceAction: AdminWorkoutService.deleteWorkout(id),
      onSuccess: (res) => {
        if (!res.status) return;
        const listData = workoutList.value.data?.data;
        if (!listData) return;

        const index = listData.findIndex((workout) => workout.id === id);
        listData.splice(index, 1);
      },
    });

  return {
    postWorkout,
    workout,
    getWorkoutById,
    workoutList,
    getWorkouts,
    patchWorkout,
    deleteWorkout,
  };
});
