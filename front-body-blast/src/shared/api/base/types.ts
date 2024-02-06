export interface AppBaseEntity {
  id: number;
  createdAt: string; // iso date format: 2023-11-23T12:17:00.852Z
  updatedAt: string | null; // iso date format: 2023-11-23T12:17:00.852Z
  deletedAt: string | null; // iso date format: 2023-11-23T12:17:00.852Z
}

export namespace AppBaseEntity {
  export interface Dto {
    id: number;
  }

  export interface Response<T> {
    data: T;
  }
}
