import axios, { type AxiosError } from 'axios';
import { IResource } from '../http';

export namespace ErrorHandler {
  export namespace Resource {
    export type Action = (err: IResource.Error) => unknown;
  }
}

function handle502(error: IResource.Error) {
  if (error.statusCode !== 502) return false;
  else location.replace(`/502?redirectedFrom=${location.pathname}`);
  return true;
}

export async function handleAxiosError<T>(
  err: unknown,
  middlewares?: ErrorHandler.Resource.Action[],
): Promise<IResource<T>> {
  if (isAxiosError(err)) {
    const error = IResource.Error.build(err);
    if (!handle502(error) && middlewares) {
      for (const mw of middlewares) {
        await mw(error);
      }
    }
    return { error };
  } else throw err;
}

function isAxiosError(err: unknown): err is AxiosError<IResource.Error.Axios> {
  return axios.isAxiosError(err);
}
