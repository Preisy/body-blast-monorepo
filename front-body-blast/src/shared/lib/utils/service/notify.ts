import { Notify as QNotify } from 'quasar';
import { IRes, IResource } from '../http';

export namespace Notify {
  export function error(err: IResource.Error) {
    QNotify.create({
      type: 'negative',
      message: err.message,
      timeout: 2000,
    });
  }

  export const no401error = (err: IResource.Error) => err.statusCode !== 401 && error(err);

  export function success(data: unknown) {
    if (IRes.isRes(data)) {
      QNotify.create({
        type: 'positive',
        badgeColor: 'positive',
        message: data.message,
      });
    }
  }
}
