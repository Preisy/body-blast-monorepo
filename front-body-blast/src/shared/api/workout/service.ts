import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { Workout } from './types';

export namespace WorkoutsService {
  export const getWorkouts = useServiceAction((pagination?: Workout.Get.Dto) =>
    api.get<Workout.Get.Response>('/workouts/date', { params: pagination }),
  );
  export const patchWorkout = useServiceAction((data: Workout.Patch.Dto) =>
    api.patch<Workout.Patch.Response>(`/workouts/${data.id}`, data.data),
  );
}
