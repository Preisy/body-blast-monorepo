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
  anthrpJobPeriod: Nullable<number>;
  canWatchVideo: boolean;
}
