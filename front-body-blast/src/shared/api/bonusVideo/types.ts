import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';

export interface BonusVideo extends AppBaseEntity {
  name: string;
  linkUrl: string;
}

export namespace BonusVideo {
  export interface Response extends AppPagination.Response<BonusVideo> {}
}
