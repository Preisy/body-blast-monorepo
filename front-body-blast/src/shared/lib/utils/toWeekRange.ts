import moment from 'moment';
import { Diary } from 'shared/api/diary';

/// Converts ISO date format to week range,
export const toWeekRange = (isoDateString: Diary['date']) => {
  const [dd, mm] = moment(isoDateString).format('DD.MM').split('.');
  const date = moment()
    .date(parseInt(dd))
    .month(parseInt(mm) - 1);
  const dayNumOfWeek = date.day() || 7;
  const begin = parseInt(date.format('DD')) - dayNumOfWeek + 1;
  const end = begin + 6;
  return `${begin}-${end}`;
};
