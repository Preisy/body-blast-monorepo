import { ComposerTranslation } from 'vue-i18n';
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
  nutritRestrict: string;
  allergy: string;
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
  export namespace Get {
    export interface Response extends AppBaseEntity.Response<User> {}
  }
  export namespace Patch {
    export interface Dto extends Partial<Omit<User, 'email' | 'password' | 'firstName' | 'lastName'>> {}
    export interface Response extends AppBaseEntity.Response<User> {}
  }

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
      loadRestrictions: z.string().min(1).max(50),
      sportsExp: z.string().min(1).max(50),
      goals: z.string().min(1).max(50),
    });
}

export namespace Auth {
  export interface Dto extends Pick<User, 'email' | 'password'> {}
  export interface Response {
    accessToken: string;
    refreshToken: string;
  }
  export const validation = () =>
    z.object({
      email: z.string().email(),
      password: z.string(),
    });
}

export namespace Refresh {
  //accessToken: string, refreshToken: string, same as auth
  export interface Dto {
    accessToken: string;
    refreshToken: string;
  }
  export interface Response extends Auth.Response {}
}

export namespace Logout {
  export interface Response extends AppBaseEntity.Response<{ status: boolean }> {}
}

export namespace SignUp {
  export interface Dto extends User {}

  export interface Response {
    accessToken: string;
    refreshToken: string;
  }

  // Sign up (body params)
  export namespace BodyParams {
    export interface Dto extends Pick<User, 'age' | 'weight' | 'height' | 'weightInYouth'> {}
    export const validation = () =>
      User.validation().pick({
        age: true,
        weight: true,
        height: true,
        weightInYouth: true,
      });
  }

  // Sign up (credentials)
  export namespace Credentials {
    export interface Dto extends Auth.Dto, Pick<User, 'firstName' | 'lastName'> {}

    export const validation = (t: ComposerTranslation) =>
      Auth.validation()
        .extend({
          firstname: z.string().min(3).max(50),
          lastname: z.string().min(3).max(50),
          password: z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9a-z]*$/, t('auth.signUp.credentials.errors.strongPassword'))
            .max(30),
          passwordRepeat: z.string().min(6).max(50),
        })
        .superRefine(({ passwordRepeat, password }, ctx) => {
          if (passwordRepeat !== password) {
            ctx.addIssue({
              code: 'custom',
              message: t('auth.signUp.credentials.errors.passwordMismatch'),
              path: ['passwordRepeat'],
            });
          }
        });
  }

  // Sign up (Diseases)
  export namespace Diseases {
    export interface Dto
      extends Pick<User, 'gastroDeseases' | 'insulinResistance' | 'kidneyDesease' | 'heartDesease' | 'muscleDesease'> {}

    export const validation = () =>
      User.validation().pick({
        gastroDeseases: true,
        insulinResistance: true,
        kidneyDesease: true,
        heartDesease: true,
        muscleDesease: true,
      });
  }

  // Sign up (Forbiddens)
  export namespace Forbiddens {
    export interface Dto extends Pick<User, 'nutritRestrict' | 'allergy' | 'mealIntolerance'> {}
    export const validation = () =>
      User.validation().pick({
        nutritRestrict: true,
        allergy: true,
        mealIntolerance: true,
      });
  }

  // Sign up (Motivations)
  export namespace Motivations {
    export interface Dto extends Pick<User, 'loadRestrictions' | 'sportsExp' | 'goals'> {}

    export const validation = () =>
      User.validation().pick({
        loadRestrictions: true,
        sportsExp: true,
        goals: true,
      });
  }

  export const validation = (t: ComposerTranslation) =>
    User.validation().merge(SignUp.Credentials.validation(t).sourceType());
}
