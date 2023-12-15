import { BaseResponse, AppPagination } from 'shared/api/base';
import { User } from 'shared/api/user';

export namespace AdminGetUsers {
  export interface Response extends AppPagination.Response<User> {}
}

export namespace AdminPatchUser {
  export interface Response extends BaseResponse<User> {}
}
