export interface IState {
  readonly value: IState.Simple.Full;
  loading(): void;
  success(): void;
  error(): void;
  isLoading(): boolean;
  isSuccess(): boolean;
  isError(): boolean;
}

export namespace IState {
  export type Simple = 'LOADING' | 'SUCCESS' | 'ERROR';

  export namespace Simple {
    export type Full = 'UNSET' | Simple;
  }
}
export function useState(defaultValue?: IState.Simple): IState {
  return {
    value: defaultValue ?? 'UNSET',
    loading() {
      this.value = 'LOADING';
    },
    success() {
      this.value = 'SUCCESS';
    },
    error() {
      this.value = 'ERROR';
    },
    isLoading() {
      return this.value === 'LOADING';
    },
    isSuccess() {
      return this.value === 'SUCCESS';
    },
    isError() {
      return this.value === 'ERROR';
    },
  } as Writable<IState>;
}
