import type { AxiosError } from 'axios';

export type IResource<T = unknown> = XOR<{ data: T }, { error: IResource.Error }>;

export namespace IResource {
  export type Future<T = unknown> = Promise<IResource<T>>;

  export namespace Api {
    export interface Error {
      debugMessage: string;
      message: string;
      status: string;
      timestamp: string;
    }
  }

  export interface Error {
    statusCode: Optional<number>;
    message: string;
    original: AxiosError<Error.Axios>;
  }

  export namespace Error {
    export function build(err: AxiosError<Error.Axios>) {
      return {
        statusCode: err.response?.status,
        message: (err.response?.data as Api.Error)?.message || err.message,
        original: err,
      };
    }

    export interface Server {
      error: string;
      path: string;
      status: number;
      timestamp: string;
    }
    export type Axios = Api.Error | Server;
  }
}
