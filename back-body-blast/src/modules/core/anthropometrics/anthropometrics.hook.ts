import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  ForbiddenError,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Action, UserRole } from '../../../constants/constants';
import { UserEntity } from '../user/entities/user.entity';
import { MainException } from '../../../exceptions/main.exception';
import { Injectable } from '@nestjs/common';
import { BaseAnthropometrcisService } from './base-anthropometrics.service';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';

type AnthropometricsSubject = InferSubjects<typeof AnthropometricsEntity> | 'all';
export type Ability = MongoAbility<[Action, AnthropometricsSubject]>;

@Injectable()
export class AnthropometricsHook {
  constructor(private readonly baseService: BaseAnthropometrcisService) {}
  async checkAbility(action: Action, user: UserEntity) {
    const newAnthrp = new AnthropometricsEntity();

    try {
      const ability = this.defineAbility(user);
      ForbiddenError.from(ability).throwUnlessCan(action, newAnthrp);
      return;
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }

  async checkAbilityWithId(action: Action, user: UserEntity, id: AnthropometricsEntity['id']) {
    const newAnthrp = new AnthropometricsEntity();

    const { data: anthrp } = await this.baseService.findOne(id);
    Object.assign(newAnthrp, anthrp);

    try {
      const ability = await this.defineAbility(user);
      ForbiddenError.from(ability).throwUnlessCan(action, newAnthrp, id);
      return;
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }

  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<Ability>(createMongoAbility);
    if (user.role === UserRole.Admin) {
      can(Action.All, AnthropometricsEntity);
      cannot(Action.Update, AnthropometricsEntity);
      cannot(Action.Read, AnthropometricsEntity, { userId: { $ne: user.id } });
    } else {
      can(Action.ReadAll, AnthropometricsEntity);
      can(Action.Read, AnthropometricsEntity, { userId: { $eq: user.id } });
      can(Action.Update, AnthropometricsEntity, { userId: { $eq: user.id } });
      can(Action.Delete, AnthropometricsEntity, { userId: { $eq: user.id } });
      cannot(Action.Update, AnthropometricsEntity, { userId: { $ne: user.id } });
      cannot(Action.Read, AnthropometricsEntity, { userId: { $ne: user.id } });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<AnthropometricsSubject>,
    });
  }
}
