import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Action } from '../../ability/ability.factory';
import { UserEntity } from '../user/entities/user.entity';
import { MainException } from '../../../exceptions/main.exception';
import { Injectable } from '@nestjs/common';
import { BaseAnthropometrcisService } from './base-anthropometrics.service';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';

@Injectable()
export class AnthropometricsHook {
  constructor(
    private readonly baseService: BaseAnthropometrcisService,
    private readonly abilityFactory: AbilityFactory,
  ) {}
  async checkAbility(action: Action, user: UserEntity, id?: AnthropometricsEntity['id']) {
    const ability = await this.abilityFactory.defineAbility(user);
    const newAnthrp = new AnthropometricsEntity();

    if (id) {
      const { data: anthrp } = await this.baseService.findOne(id);
      Object.assign(newAnthrp, anthrp);
    }

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, newAnthrp, id);
      return;
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }
}
