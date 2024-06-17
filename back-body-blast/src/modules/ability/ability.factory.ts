import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from '@casl/ability';
import { UserEntity } from '../core/user/entities/user.entity';
import { WorkoutEntity } from '../core/workout/entity/workout.entity';
import { Injectable } from '@nestjs/common';
import { AnthropometricsEntity } from '../core/anthropometrics/entities/anthropometrics.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof WorkoutEntity | typeof AnthropometricsEntity> | 'all';
export type Ability = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<Ability>(createMongoAbility);
    if (user.role == 'admin') {
      can(Action.Manage, WorkoutEntity);
      can(Action.Manage, AnthropometricsEntity);
      cannot(Action.Update, WorkoutEntity, ['comment']).because('Comment filed is client only');
    } else if (user.role == 'client') {
      can(Action.Read, WorkoutEntity, { userId: { $eq: user.id } });
      can(Action.Read, AnthropometricsEntity, { userId: { $eq: user.id } });
      can(Action.Update, AnthropometricsEntity, { userId: { $eq: user.id } });
      can(Action.Delete, AnthropometricsEntity, { userId: { $eq: user.id } });

      can(Action.Update, WorkoutEntity, ['comment']);
      cannot(Action.Update, WorkoutEntity, { userId: { $ne: user.id } }).because(
        'You can only update your own workouts',
      );
    }
    return build({ detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects> });
  }
}
