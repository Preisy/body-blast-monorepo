import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from '../../../decorators/ability.decorator';
import { AbilityFactory } from '../../../modules/ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { MainException } from '../../../exceptions/main.exception';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const abilityHandlers = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.abilityFactory.defineAbility(user);

    try {
      abilityHandlers.forEach((handler) => {
        return ForbiddenError.from(ability).throwUnlessCan(handler.action, handler.subject, user.id);
      });

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw MainException.forbidden(error.message);
      }
      throw error;
    }
  }
}
