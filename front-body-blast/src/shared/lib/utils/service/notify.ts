import { Notify as QNotify } from 'quasar';
import { IRes, IResource } from '../http';

export namespace Notify {
  export function error(err: IResource.Error) {
    QNotify.create({
      type: 'negative',
      message: err.message,
      caption: err.details,
      timeout: 2000,
    });
  }
  export const simpleError = (message: string) =>
    QNotify.create({
      type: 'negative',
      message: message,
      timeout: 1000,
    });

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

  export function simpleSuccess(message: string) {
    QNotify.create({
      message: message,
      timeout: 1000,
      color: 'success',
      icon: 'check_circle',
    });
  }

  export function createSuccess() {
    simpleSuccess('Created successfully');
  }

  export function updateSuccess() {
    simpleSuccess('Updated successfully');
  }
  export function deleteSuccess() {
    simpleSuccess('Deleted successfully');
  }
}
