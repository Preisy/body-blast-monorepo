import { api } from 'shared/config';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Addition, Training } from './types';

export namespace TrainingsService {
  export const getBaseTrainings = useServiceAction((data: Omit<Training.Dto, 'expanded'>) =>
    api.get<Training.Response.Base>('/workouts', { params: { ...data, expanded: false } }),
  );

  export const getExpandedTrainings = useServiceAction((data: Omit<Training.Dto, 'expanded'>) =>
    api.get<Training.Response.Expanded>('/workouts', { params: { ...data, expanded: true } }),
  );

  export const postAddition = useServiceAction((data: Addition.Dto) =>
    // trainingApi.post<Addition.Response>('/addition', data),
    requestSimulator<Addition.Response>(data),
  );
}
