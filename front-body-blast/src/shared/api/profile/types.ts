import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';

export interface Anthropometry {
  weight: number;
  waist: number;
  abdomen: number;
  shoulder: number;
  hip: number;
  hipVolume: number;
}

export namespace Anthropometry {
  export interface Response extends AppPagination.Response<Response.Item> {}

  export namespace Response {
    export interface Item extends Anthropometry, AppBaseEntity {
      userId: number;
    }
  }

  export const validation = () =>
    z.object({
      weight: z.string().max(5),
      waist: z.string().max(5),
      underbelly: z.string().max(5),
      shoulder: z.string().max(5),
      hip: z.string().max(5),
      hipVolume: z.string().max(5),
    });
}
