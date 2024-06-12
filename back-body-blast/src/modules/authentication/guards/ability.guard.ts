import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityHandler, CHECK_ABILITY } from '../../../decorators/ability.decorator';
import { AbilityFactory, Ability } from '../../../modules/ability/ability.factory';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const abilityHandlers = this.reflector.get<AbilityHandler[]>(CHECK_ABILITY, context.getHandler()) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.abilityFactory.defineAbility(user);

    return abilityHandlers.every((handler) => this.execPolicyHandler(handler, ability));
  }

  private execPolicyHandler(handler: AbilityHandler, ability: Ability) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
