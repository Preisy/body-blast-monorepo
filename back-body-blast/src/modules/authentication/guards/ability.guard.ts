import { ForbiddenError } from '@casl/ability';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from 'src/decorators/ability.decorator';
import { AbilityFactory } from 'src/modules/ability/ability.factory';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();
    const ability = this.abilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject));
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
