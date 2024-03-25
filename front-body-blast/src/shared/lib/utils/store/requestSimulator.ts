import { AxiosResponse } from 'axios';

export function requestSimulator<R>(msg: R) {
  return new Promise<Pick<AxiosResponse<R>, 'data'>>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: msg,
        }),
      1000,
    );
  });
}
