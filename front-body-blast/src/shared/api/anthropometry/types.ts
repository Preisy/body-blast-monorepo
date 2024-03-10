import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';

export interface Anthropometry extends AppBaseEntity {
  weight: number;
  waist: number;
  abdomen: number;
  shoulder: number;
  hip: number;
  hipVolume: number;
  userId: number;
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
      weight: z.coerce.number().min(20).max(600),
      waist: z.coerce.number().min(30).max(300),
      abdomen: z.coerce.number().min(30).max(500),
      shoulder: z.coerce.number().min(30).max(150),
      hip: z.coerce.number().min(30).max(150),
      hipVolume: z.coerce.number().min(30).max(150),
    });
}
