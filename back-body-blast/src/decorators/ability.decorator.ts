import { SetMetadata } from '@nestjs/common';
import { Action, Subjects, Ability } from '../modules/ability/ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

interface IAbilityHandler {
  handle(ability: Ability): boolean;
}

type AbilityHandlerCallback = (ability: Ability) => boolean;

export type AbilityHandler = IAbilityHandler | AbilityHandlerCallback;

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requiremnts: AbilityHandler[]) => SetMetadata(CHECK_ABILITY, requiremnts);
