import { AxiosError, type AxiosResponse } from 'axios';
import type { IResource } from 'shared/lib';
import { ErrorHandler, handleAxiosError } from './errorHandler';
import { Notify } from './notify';

export function useServiceAction<P extends unknown[], R, T = never>(
  // query: ServiceAction.Query<P, R>,
  query: ServiceAction.PartialQuery<P, R>,
  middlewares?: ServiceAction.Middlewares<R, T>,
) {
  return async (...params: P): Promise<IResource<[T] extends [never] ? R : Awaited<T>>> => {
    try {
      const res = await query(...params);
      if (res instanceof AxiosError) throw res;

      for (const mw of middlewares?.success ?? [Notify.success]) {
        await mw(res.data);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = middlewares?.transform ? await middlewares.transform(res.data) : res.data;

      return { data };
    } catch (err) {
      console.error(err);
      return handleAxiosError(err, middlewares?.error ?? [Notify.error]);
    }
  };
}

export namespace ServiceAction {
  export type Query<P extends unknown[], R> = (...params: P) => Promise<AxiosResponse<R>>;
  export type PartialQuery<P extends unknown[], R> = (...params: P) => Promise<Pick<AxiosResponse<R>, 'data'>>;

  export interface Middlewares<D, T> {
    error?: ErrorHandler.Resource.Action[];
    success?: Middlewares.Action.Success<D>[];
    transform?: Middlewares.Action.Transform<D, T>;
  }

  export namespace Middlewares {
    export namespace Action {
      export type Success<D> = (data: D) => unknown;
      export type Transform<D, T> = (data: D) => T;
    }
  }
}

export async function withFileName(responsePromise: Promise<AxiosResponse<File>>): Promise<AxiosResponse<File>> {
  const response = await responsePromise;
  const contentDisposition: Optional<string> = response.headers['content-disposition'];
  if (contentDisposition) {
    const fileNameRegex = /filename\*?=(UTF-8''|")?([^"]*)"?/;
    const name = contentDisposition.match(fileNameRegex)?.[2];
    if (name) {
      const decodedName = decodeURIComponent(name);
      (response.data as Writable<File>).name = decodedName;
    }
  }
  return response;
}
