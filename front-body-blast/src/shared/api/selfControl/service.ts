/* eslint-disable @typescript-eslint/no-unused-vars */
import { date } from 'quasar';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { SelfControl } from './types';

const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
export const getSelfControlResponse: SelfControl.Get.Response = {
  data: [
    {
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      activivty: '',
      behaviour: '',
      date: '2024-01-19',
      id: 3,
      sum: 50000,
      userId: 2,
      steps: 20000,
    },
    {
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      activivty: '',
      behaviour: '',
      date: '2024-01-12',
      id: 2,
      sum: 40000,
      userId: 2,
      steps: 12000,
    },
    {
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      activivty: '',
      behaviour: '',
      date: '2024-01-05',
      id: 1,
      sum: 30000,
      userId: 2,
      steps: 8000,
    },
  ],
  count: 3,
};

export const getSelfControlByIdResponse: SelfControl.GetById.Response = {
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
  activivty: '',
  behaviour: '',
  date: '2024-01-19',
  id: 3,
  sum: 50000,
  userId: 2,
  steps: 20000,
  props: [
    {
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      id: 1,
      label: 'Сон',
      selfControlId: 3,
      value: 4,
    },
    {
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      id: 2,
      label: 'Еда',
      selfControlId: 3,
      value: 5,
    },
    {
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      id: 3,
      label: 'Занятия',
      selfControlId: 3,
      value: 2,
    },
  ],
  user: null,
};

export namespace SelfControlService {
  export const patch = useServiceAction(() => requestSimulator<SelfControl.Patch.Response>({}));
  export const get = useServiceAction(() => requestSimulator<SelfControl.Get.Response>(getSelfControlResponse));
  export const getById = useServiceAction(() =>
    requestSimulator<SelfControl.GetById.Response>(getSelfControlByIdResponse),
  );
}
