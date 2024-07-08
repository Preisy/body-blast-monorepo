import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  ForbiddenError,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { UserEntity } from '../user/entities/user.entity';
import { MainException } from '../../../exceptions/main.exception';
import { Injectable } from '@nestjs/common';
import { WorkoutEntity } from './entity/workout.entity';
import { BaseWorkoutService } from './base-workout.service';
import { UserRole, Action } from '../../../constants/constants';

type WorkoutSubject = InferSubjects<typeof WorkoutEntity> | 'all';
export type Ability = MongoAbility<[Action, WorkoutSubject]>;

@Injectable()
export class WorkoutHook {
  constructor(private readonly baseService: BaseWorkoutService) {}
  async checkAbility(action: Action, user: UserEntity) {
    const newWorkout = new WorkoutEntity();
    try {
      const ability = this.defineAbility(user);
      ForbiddenError.from(ability).throwUnlessCan(action, newWorkout);
      return;
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }

  async checkAbilityWithId(action: Action, user: UserEntity, id: WorkoutEntity['id']) {
    const newWorkout = new WorkoutEntity();
    const { data: workout } = await this.baseService.findOne(id);
    Object.assign(newWorkout, workout);
    try {
      const ability = this.defineAbility(user);
      ForbiddenError.from(ability).throwUnlessCan(action, newWorkout, id);
      return;
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }

  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<Ability>(createMongoAbility);
    if (user.role === UserRole.Admin) {
      can(Action.All, WorkoutEntity);
      cannot(Action.Update, WorkoutEntity);
      cannot(Action.Read, WorkoutEntity, { userId: { $ne: user.id } });
    } else {
      can(Action.ReadAll, WorkoutEntity);
      can(Action.Update, WorkoutEntity, { userId: { $eq: user.id } });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<WorkoutSubject>,
    });
  }
}
