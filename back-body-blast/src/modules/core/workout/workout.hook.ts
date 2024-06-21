import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Action } from '../../ability/ability.factory';
import { UserEntity } from '../user/entities/user.entity';
import { BaseWorkoutService } from './base-workout.service';
import { WorkoutEntity } from './entity/workout.entity';
import { MainException } from '../../../exceptions/main.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutHook {
  constructor(
    private readonly baseService: BaseWorkoutService,
    private readonly abilityFactory: AbilityFactory,
  ) {}
  async checkAbility(action: Action, user: UserEntity, id?: WorkoutEntity['id']) {
    const ability = await this.abilityFactory.defineAbility(user);
    const newWorkout = new WorkoutEntity();

    if (id) {
      const { data: workout } = await this.baseService.findOne(id);
      Object.assign(newWorkout, workout);
    }

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, newWorkout, 'comment');
      return;
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }
}
