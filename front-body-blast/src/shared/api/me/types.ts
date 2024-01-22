import { AppBaseEntity } from '../base';
import { User } from '../user';

export interface Me extends User {}

export namespace Me {
  export interface Response extends AppBaseEntity.Response<Me> {}
}
