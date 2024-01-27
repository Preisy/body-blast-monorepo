import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export interface Workout extends AppBaseEntity {
  name: string;
  date: string; //ISO string date type: 2023-12-31
  comment: string;
  loop: number;
  userId: number;
  exercises: Optional<
    Array<
      AppBaseEntity & {
        name: string;
        weight: number;
        sets: number;
        repetitions: number;
        restTime: number;
        pace: string;
        photoLink: string;
        videoLink: string;
        trainerComment: string;
        workoutId: number;
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

  export const validation = () =>
    z.object({
      name: z.string().min(1),
      loop: z.string().min(1),
      comment: z.string().min(1),
      exercises: z.array(
        z.object({
          name: z.string().min(1),
          weight: z.string().min(1),
          sets: z.string().min(1),
          repetitions: z.string().min(1),
          restTime: z.string().min(1),
          pace: z.string().min(1),
          _promptId: z.number(), //prompt Id will be converted to photoLink and videoLink
          trainerComment: z.string().min(1),
        }),
      ),
    });
}

//TODO: backend endpoint?
export namespace Addition {
  export interface Dto {
    message: string;
  }

  export interface Response {
    message: string;
  }

  export const validation = () =>
    z.object({
      message: z.string().min(3).max(50),
    });
}
