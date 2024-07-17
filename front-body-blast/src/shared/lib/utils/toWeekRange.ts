import moment from 'moment';
import { ISODate } from 'shared/api';

/// Converts ISO date format to week range,
export const toWeekRange = (isoDateString: ISODate) => {
  const endOfMonth = moment(isoDateString).endOf('month');

  const [dd, mm] = moment(isoDateString).format('DD.MM').split('.');
  const date = moment()
    .date(parseInt(dd))
    .month(parseInt(mm) - 1);
  const dayNumOfWeek = date.day() || 7;
  let begin = parseInt(date.format('DD')) - dayNumOfWeek + 1;
  let end = begin + 6;

  if (begin < 1) {
    begin = 1;
  }
  if (end > endOfMonth.date()) end = endOfMonth.date();

  return `${begin}-${end}`;
};
