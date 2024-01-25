import { Moment } from 'moment';
import { z } from 'zod';
import { AppBaseEntity, Pagination } from '../base';

export namespace Training {
  export interface Dto extends Pagination.Dto {}

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
  }

  export namespace Response {
    export interface Base extends Pagination.Response<Training.Base> {}
    export interface Expanded extends Pagination.Response<Training.Expanded> {}
  }

  export interface Exercise {
    id: number;
    createdAt: Moment;
    updatedAt: Moment;
    deletedAt: Moment;
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
