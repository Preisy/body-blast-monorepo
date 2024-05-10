export type ISODate = string; //ISO format

export interface AppBaseEntity {
  readonly id: string; //GUID
  readonly createdAt: ISODate; // iso date format: 2023-11-23T12:17:00.852Z
  readonly updatedAt: ISODate | null; // iso date format: 2023-11-23T12:17:00.852Z
  readonly deletedAt: ISODate | null; // iso date format: 2023-11-23T12:17:00.852Z
}

export namespace AppBaseEntity {
  export interface Dto {
    id: AppBaseEntity['id'];
  }

  export interface Response<T> {
    data: T;
  }
}
