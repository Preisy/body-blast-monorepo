import moment from 'moment';
import { Diary } from 'shared/api/diary';

/// Converts 'dateString' DD.MM date format to week range,
/// which includes 'dateString'
/// Example: 20.02 -> 19-25
/// 19.02 - Monday
/// 25.02 - Sunday
/// 20.02 takes place between this two values
export const toWeekRange = (dateString: Diary['date']) => {
  const [dd, mm] = dateString.split('.');
  const date = moment()
    .date(parseInt(dd))
    .month(parseInt(mm) - 1);
  const dayNumOfWeek = date.day();
  const begin = parseInt(date.format('DD')) - dayNumOfWeek + 1;
  const end = begin + 6;
  return `${begin}-${end}`;
};
