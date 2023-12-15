import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';
import { BaseResponse } from '../base';
import { User } from '../user';

// Authentication
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
  export interface Response extends BaseResponse<{ status: boolean }> {}
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
    export const validation = (t: ComposerTranslation) =>
      z.object({
        age: z.coerce.number().min(1).max(100),
        weightAndHeight: z.string().superRefine((val, ctx) => {
          const [weight, height] = val.split('/');
          const numWeight = parseFloat(weight);
          const numHeight = parseFloat(height);
          if (numWeight < 20 || numWeight > 600)
            ctx.addIssue({ code: 'custom', message: t('auth.signUp.bodyParams.errors.weight') });
          if (numHeight < 100 || numHeight > 250)
            ctx.addIssue({ code: 'custom', message: t('auth.signUp.bodyParams.errors.height') });
        }),
        weightInYouth: z.coerce.number().min(20).max(600),
      });
  }

  // Sign up (credentials)
  export namespace Credentials {
    export interface Dto extends Auth.Dto, Pick<User, 'firstName' | 'lastName'> {}

    export const validation = (t: ComposerTranslation) =>
      Auth.validation()
        .extend({
          username: z
            .string()
            .min(3)
            .max(50)
            .refine((val) => !!val.split(' ')[1], t('auth.signUp.credentials.errors.secondName')),
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
      z.object({
        gastroDeseases: z.string().min(1),
        insulinResistance: z.coerce.boolean(),
        kidneyDesease: z.string().min(1),
        heartDesease: z.string().min(1),
        muscleDesease: z.string().min(1),
      });
  }

  // Sign up (Forbiddens)
  export namespace Forbiddens {
    export interface Dto extends Pick<User, 'nutritRestrict' | 'allergy' | 'mealIntolerance'> {}
    export const validation = () =>
      z.object({
        nutritRestrict: z.string().min(1),
        allergy: z.string().min(1),
        mealIntolerance: z.string().min(1),
      });
  }

  // Sign up (Motivations)
  export namespace Motivations {
    export interface Dto extends Pick<User, 'loadRestrictions' | 'sportsExp' | 'goals'> {}

    export const validation = () =>
      z.object({
        loadRestrictions: z.string().min(3).max(50),
        sportsExp: z.string().min(3).max(50),
        goals: z.string().min(3).max(50),
      });
  }
}
