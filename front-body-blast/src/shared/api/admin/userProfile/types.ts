import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { User } from 'shared/api/user';

export namespace AdminGetUser {
  export interface Response extends AppBaseEntity.Response<User> {}
}

export namespace AdminGetUsers {
  export interface Response extends AppPagination.Response<User> {}
}

export namespace AdminPatchUser {
  export interface Response extends AppBaseEntity.Response<User> {}
}
