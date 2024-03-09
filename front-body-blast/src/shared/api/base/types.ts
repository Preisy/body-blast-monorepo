export interface AppBaseEntity {
  readonly id: number;
  readonly createdAt: string; // iso date format: 2023-11-23T12:17:00.852Z
  readonly updatedAt: string | null; // iso date format: 2023-11-23T12:17:00.852Z
  readonly deletedAt: string | null; // iso date format: 2023-11-23T12:17:00.852Z
}

export namespace AppBaseEntity {
  export interface Dto {
    id: number;
  }

  export interface Response<T> {
    data: T;
  }
}
