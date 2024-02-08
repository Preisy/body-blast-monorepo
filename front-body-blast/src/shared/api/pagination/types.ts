export namespace AppPagination {
  export interface BaseDto {
    page?: number;
    limit?: number;
    expanded?: boolean;
  }

  export interface DateDto {
    from?: string; //ISO format: 2023-12-31
    to?: string; //ISO format: 2023-12-31
    expanded?: boolean;
  }

  export interface Response<T> {
    data: Array<T>;
    count: number;
  }
}
