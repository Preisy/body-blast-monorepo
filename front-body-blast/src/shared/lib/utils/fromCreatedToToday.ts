import moment from 'moment';
import { useUserStore } from 'shared/api';

export function gtCreation(date: string) {
  const { user } = useUserStore();
  return user.data
    ? date.split('/').join('-') > moment(user.data.data.createdAt).hour(0).minute(0).second(0).toISOString()
    : false;
}
export function lteToday(date: string) {
  return date.split('/').join('-') < moment().toISOString();
}
export function fromCreatedToToday(date: string) {
  return gtCreation(date) && lteToday(date);
}
