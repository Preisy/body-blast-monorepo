import { Moment } from 'moment';
import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export namespace Training {
  export interface Dto extends AppPagination.BaseDto {}

  export interface Base extends AppBaseEntity {
    name: string;
    comment: string;
    date: Moment;
    loop: number;
    userId: number;
    localeDate: string;
  }
  export interface Expanded extends Base {
    exercises: Array<Exercise>;
    user: User;
  }

  export namespace Response {
    export interface Base extends AppPagination.Response<Training.Base> {}
    export interface Expanded extends AppPagination.Response<Training.Expanded> {}
  }

  export interface Exercise extends AppBaseEntity {
    name: string;
    trainerComment: string;
    weight: number;
    sets: number;
    repetitions: number;
    restTime: number;
    pace: string;
    photoLink: string;
    videoLink: string;
    workoutId: number;
  }
}

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
