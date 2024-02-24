import { defineStore } from 'pinia';
import { AppPagination } from 'shared/api/pagination';
import { Training } from 'shared/api/training';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { AdminTrainingsService } from './service';
import { AdminTraining } from './types';

export const useAdminTrainingStore = defineStore('admin-training-store', () => {
  const userTraining = ref(useSingleState<Training.Response.Expanded>({ update: true, delete: true }));
  // GET /api/admin/workouts/{id}
  const getUserTraining = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: userTraining.value,
      serviceAction: AdminTrainingsService.getUserTrainings(id),
    });

  const trainings = ref(useSingleState<Training.Response.Expanded>({ create: true }));
  // GET /api/admin/workouts
  const getTrainings = (data?: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: AdminTrainingsService.getTrainings(data),
    });

  // POST /api/admin/workout
  const sendTraining = (data: AdminTraining.Dto) =>
    useStoreAction({
      state: trainings.value.createState,
      serviceAction: AdminTrainingsService.postTrainings(data),
    });

  // PATCH /api/admin/workouts/{id}
  const patchUserTraining = (id: number, data: AdminTraining.Dto) =>
    useStoreAction({
      state: userTraining.value.updateState,
      serviceAction: AdminTrainingsService.patchUserTrainings(id, data),
    });

  // DELETE /api/admin/workouts/{id}
  const deleteUserTraining = (id: number) =>
    useStoreAction({
      state: userTraining.value.deleteState,
      serviceAction: AdminTrainingsService.deleteUserTrainings(id),
    });

  return {
    sendTraining,
    userTraining,
    getUserTraining,
    trainings,
    getTrainings,
    patchUserTraining,
    deleteUserTraining,
  };
});
