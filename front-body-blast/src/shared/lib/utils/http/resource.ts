import type { AxiosError } from 'axios';

export type IResource<T = unknown> = XOR<{ data: T }, { error: IResource.Error }>;

export namespace IResource {
  export type Future<T = unknown> = Promise<IResource<T>>;

  export namespace Api {
    export interface Error {
      code: string;
      message: string;
      status: number;
      details: string;
    }
  }

  export interface Error {
    statusCode: Optional<number>;
    message: string;
    details?: string;
    original: AxiosError<Error.Axios>;
  }

  export namespace Error {
    export function build(err: AxiosError<Error.Axios>): Error {
      return {
        statusCode: err.response?.status,
        message: (err.response?.data as Api.Error)?.message || err.message,
        original: err,
        details: (err.response?.data as Api.Error)?.details,
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
