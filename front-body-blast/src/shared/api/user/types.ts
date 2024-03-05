import { z } from 'zod';
import { AppBaseEntity } from '../base';

export interface User extends AppBaseEntity {
  firstName: string;
  lastName: string;
  role: 'client' | 'admin';
  email: string;
  password: string;
  token: {
    id: number;
    hash: string;
    refreshHash: string;
  };
  tokenId: number;
  age: number;
  height: number;
  weight: number;
  weightInYouth: number;
  nutritRestrict: boolean;
  allergy: boolean;
  gastroDeseases: string;
  mealIntolerance: string;
  insulinResistance: boolean;
  kidneyDesease: string;
  heartDesease: string;
  muscleDesease: string;
  loadRestrictions: string;
  sportsExp: string;
  goals: string;
  stepsGoal: number;
  anthrpJobPeriod: Nullable<number>;
  canWatchVideo: boolean;
}

export namespace User {
  export const validation = () =>
    z.object({
      age: z.coerce.number().min(1).max(100),
      weight: z.coerce.number().min(20).max(600),
      height: z.coerce.number().min(100).max(250),
      weightInYouth: z.coerce.number().min(20).max(600),
      gastroDeseases: z.string().min(1),
      insulinResistance: z.coerce.boolean(),
      kidneyDesease: z.string().min(1),
      heartDesease: z.string().min(1),
      muscleDesease: z.string().min(1),
      nutritRestrict: z.string().min(1),
      allergy: z.string().min(1),
      mealIntolerance: z.string().min(1),
      loadRestrictions: z.string().min(3).max(50),
      sportsExp: z.string().min(3).max(50),
      goals: z.string().min(3).max(50),
    });
}
