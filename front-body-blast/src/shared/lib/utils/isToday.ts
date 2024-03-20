import moment, { Moment } from 'moment-timezone';

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
  const dateMoment = typeof date === 'string' ? getUTC3Date(isoString) : date;
  const today = getUTC3Date();

  return isEqualDates(today, dateMoment);
}

export function isEqualDates(date1: string | Moment, date2: string | Moment) {
  const isoString1 = typeof date1 === 'string' ? date1.split('/').join('-') : undefined;
  const dateMoment1 = typeof date1 === 'string' ? getUTC3Date(isoString1) : date1;
  const isoString2 = typeof date2 === 'string' ? date2.split('/').join('-') : undefined;
  const dateMoment2 = typeof date2 === 'string' ? getUTC3Date(isoString2) : date2;

  return (
    dateMoment1.isSame(dateMoment2, 'days') &&
    dateMoment1.isSame(dateMoment2, 'months') &&
    dateMoment1.isSame(dateMoment2, 'years')
  );
}

export function getUTC3Date(iso?: string) {
  return iso ? moment(iso).tz('Europe/Moscow', true) : moment().tz('Europe/Moscow');
}
