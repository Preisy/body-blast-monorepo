import { Moment } from 'moment';
import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';

export namespace Training {
  export interface Dto {
    page: number;
    limit: number;
    expanded: boolean;
  }

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
    export interface Base extends AppPagination.Response<Training.Base> {}
    export interface Expanded extends AppPagination.Response<Training.Expanded> {}
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
