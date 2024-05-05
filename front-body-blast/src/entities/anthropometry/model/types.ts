import { z } from 'zod';
import { AppBaseEntity, AppPagination } from 'shared/api';

export interface Anthropometry extends AppBaseEntity {
  weight: number;
  waist: number;
  abdomen: number;
  shoulder: number;
  hip: number;
  hipVolume: number;
  userId: AppBaseEntity['id'];
}

export namespace Anthropometry {
  export namespace Get {
    export interface Dto extends Partial<AppPagination.DateDto> {}
    export interface Response extends AppPagination.Response<Anthropometry> {}
  }

  export namespace Patch {
    export interface Dto
      extends Pick<Anthropometry, 'weight' | 'waist' | 'abdomen' | 'shoulder' | 'hip' | 'hipVolume' | 'id'> {}
    export interface Response extends AppBaseEntity.Response<Anthropometry> {}
  }

  export const validation = () =>
    z.object({
      weight: z.coerce.number().max(10000),
      waist: z.coerce.number().max(10000),
      abdomen: z.coerce.number().max(10000),
      shoulder: z.coerce.number().max(10000),
      hip: z.coerce.number().max(10000),
      hipVolume: z.coerce.number().max(10000),
    });
}
