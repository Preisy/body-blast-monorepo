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
  const dateMoment = typeof date === 'string' ? moment(isoString).utc(true).utcOffset(-3, true) : date;
  const today = getUTC3Date();

  return today.isSame(dateMoment, 'days') && today.isSame(dateMoment, 'months') && today.isSame(dateMoment, 'years');
}

export function isEqualDates(date1: string | Moment, date2: string | Moment) {
  const isoString1 = typeof date1 === 'string' ? date1.split('/').join('-') : undefined;
  const dateMoment1 = typeof date1 === 'string' ? moment(isoString1) : date1;
  const isoString2 = typeof date2 === 'string' ? date2.split('/').join('-') : undefined;
  const dateMoment2 = typeof date2 === 'string' ? moment(isoString2) : date2;
  return (
    dateMoment1.isSame(dateMoment2, 'days') &&
    dateMoment1.isSame(dateMoment2, 'months') &&
    dateMoment1.isSame(dateMoment2, 'years')
  );
}

export function getUTC3Date() {
  return moment().utc().utcOffset(-3, true);
}
