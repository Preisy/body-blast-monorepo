import moment from 'moment';
import { useMeStore } from 'shared/api/me';

export function gtCreation(date: string) {
  const { me } = useMeStore();
  return me.data
    ? date.split('/').join('-') > moment(me.data.data.createdAt).hour(0).minute(0).second(0).toISOString()
    : false;
}
export function lteToday(date: string) {
  return date.split('/').join('-') < moment().toISOString();
}
export function fromCreatedToToday(date: string) {
  return gtCreation(date) && lteToday(date);
}
