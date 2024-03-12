import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export interface Workout extends AppBaseEntity {
  name: string;
  date: string; //ISO string date type: 2023-12-31
  comment: Optional<string>;
  cycle: number;
  userId: number;
  exercises: Optional<
    Array<
      AppBaseEntity & {
        name: string;
        weight: number;
        sets: number;
        repetitions: string;
        restTime: number;
        pace: string;
        photoLink: string;
        videoLink: string;
        workoutId: number;
        trainerComment: Optional<string>;
      }
    >
  >;
  user: Optional<User>;
}

export namespace Workout {
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<Workout> {}
  }

  export namespace Patch {
    export interface Dto {
      id: Workout['id'];
      data: Pick<Workout, 'comment'>;
    }
    export interface Response extends AppBaseEntity.Response<Workout> {}
  }
  export const validation = () =>
    z.object({
      name: z.coerce.string().min(1).default(''),
      cycle: z.coerce.string().min(1).default(''),
      comment: z.coerce.string().min(1).optional(),
      exercises: z.array(
        z.object({
          name: z.coerce.string().min(1),
          weight: z.coerce.number({ invalid_type_error: 'Expected number' }).min(1),
          sets: z.coerce.number({ invalid_type_error: 'Expected number' }).min(1),
          repetitions: z.string().min(1),
          trainerComment: z.string().min(1).optional(),
          restTime: z.coerce.number({ invalid_type_error: 'Expected number' }).min(1),
          pace: z.coerce.string().min(1),
          prompt: z.object({
            id: z.coerce.number(),
            type: z.string(),
            photoLink: z.string(),
            videoLink: z.string(),
          }), //prompt Id will be converted to photoLink and videoLink
        }),
      ),
    });
}
