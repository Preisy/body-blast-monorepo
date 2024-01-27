import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AppPagination } from '../pagination';
import { Workout } from './types';

export namespace WorkoutsService {
  export const getTrainings = useServiceAction((pagination: AppPagination.BaseDto) =>
    api.get<Workout.Get.Response>('/workouts', { params: pagination }),
  );
}
