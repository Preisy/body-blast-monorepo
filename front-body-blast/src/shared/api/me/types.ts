import { AppBaseEntity } from '../base';
import { User } from '../user';

export interface Me extends User {}

export namespace Me {
  export namespace Get {
    export interface Response extends AppBaseEntity.Response<Me> {}
  }
  export namespace Patch {
    export interface Dto extends Partial<Omit<User, 'email' | 'password' | 'firstName' | 'lastName'>> {}
    export interface Response extends AppBaseEntity.Response<Me> {}
  }
}
