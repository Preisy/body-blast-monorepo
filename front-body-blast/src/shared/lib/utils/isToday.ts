import moment, { Moment } from 'moment';

/**
 * Checks if certain date is today
 * @param date - string in ISO Format or Quasar YYYY/MM/DD format
 */
export function isToday(date: string): boolean;

/**
 * Checks if certain date is today
 * @param date - Moment
 */
export function isToday(date: Moment): boolean;

export function isToday(date: string | Moment) {
  const isoString = typeof date === 'string' ? date.split('/').join('-') : undefined;
  const dateMoment = typeof date === 'string' ? moment(isoString) : date;
  return (
    moment().isSame(dateMoment, 'days') && moment().isSame(dateMoment, 'months') && moment().isSame(dateMoment, 'years')
  );
}

export function isEqualDates(date1: string | Moment, date2: string | Moment) {
  const isoString1 = typeof date1 === 'string' ? date1.split('/').join('-') : undefined;
  const dateMoment1 = typeof date1 === 'string' ? moment(isoString1) : date1;
  const isoString2 = typeof date2 === 'string' ? date2.split('/').join('-') : undefined;
  const dateMoment2 = typeof date2 === 'string' ? moment(isoString2) : date2;
  return (
    dateMoment1.isSame(dateMoment2, 'days') &&
    moment().isSame(dateMoment2, 'months') &&
    moment().isSame(dateMoment2, 'years')
  );
}
