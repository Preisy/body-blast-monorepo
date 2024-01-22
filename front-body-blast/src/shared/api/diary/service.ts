import { date } from 'quasar';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Diary } from './types';

const today = date.formatDate(Date.now(), 'YYYY/MM/DD');
export const DiarySlideApi = [
  {
    readonly: true,
    dateValue: '2023/10/12',
    physical: 'Ну очень много занимался',
    steps: 2000,
    sleep: 1,
    performance: 2,
    nutrition: 3,
    health: 4,
    pnsv: 5,
  },
  {
    readonly: true,
    dateValue: '2023/10/22',
    physical: 'Ну очень много занимался',
    steps: 2000,
    sleep: 3,
    performance: 5,
    nutrition: 3,
    health: 4,
    pnsv: 5,
  },
  {
    readonly: false,
    dateValue: today,
    physical: 'Ну очень много занимался',
    steps: 2000,
    sleep: 5,
    performance: 2,
    nutrition: 3,
    health: 4,
    pnsv: 5,
  },
];

export const SummaryApi = {
  week: '05-23',
  goal: 50000,
  done: 5000,
};

//TODO: api
export namespace DiaryService {
  export const getSlides = useServiceAction(() => requestSimulator<Diary.Response.DiarySlide[]>(DiarySlideApi));
  export const getSummary = useServiceAction(() => requestSimulator<Diary.Response.Summary>(SummaryApi));
}
