export interface AppBaseEntity {
  id: number;
  createdAt: string; // iso date format: 2023-11-23T12:17:00.852Z
  updatedAt: string; // iso date format: 2023-11-23T12:17:00.852Z
  deletedAt: string; // iso date format: 2023-11-23T12:17:00.852Z
}

export namespace Pagination {
  export interface Dto {
    page: number;
    limit: number;
    expanded: boolean;
  }

  export interface Response<T> {
    data: Array<T>;
    count: number;
  }
}
