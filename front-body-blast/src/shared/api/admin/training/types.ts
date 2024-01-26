import { z } from 'zod';
//TODO: consistency
export interface Exercise {
  name: string;
  weight: number;
  sets: number;
  repetitions: number;
  restTime: number;
  pace: string;
  photoLink: string;
  videoLink: string;
  trainerComment: string;
}

export interface Training {
  name: string;
  date: string; //ISO string date type: 2023-12-31
  comment: string;
  loop: number;
  userId: number;
  exercises: Array<Exercise>;
}

export namespace Exercise {
  export const validation = () =>
    z.object({
      name: z.string().min(1),
      weight: z.string().min(1),
      sets: z.string().min(1),
      repetitions: z.string().min(1),
      restTime: z.string().min(1),
      pace: z.string().min(1),
      _promptId: z.number(), //prompt Id will be converted to photoLink and videoLink
      trainerComment: z.string().min(1),
    });
}

export namespace AdminTraining {
  export interface Dto extends Training {}

  export interface Response {
    message: string;
  }

  export const validation = () =>
    z.object({
      name: z.string().min(1),
      loop: z.string().min(1),
      comment: z.string().min(1),
    });

  export namespace Delete {
    export interface Response {
      data: { status: boolean };
    }
  }
}
