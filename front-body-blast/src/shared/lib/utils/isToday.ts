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
