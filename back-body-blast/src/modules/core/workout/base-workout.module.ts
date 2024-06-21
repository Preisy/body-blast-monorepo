import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { WorkoutEntity } from '../../../modules/core/workout/entity/workout.entity';
import { ExerciseEntity } from '../exerсise/entities/exercise.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BaseWorkoutService } from './base-workout.service';
import { WorkoutHook } from './workout.hook';
import { AbilityModule } from '../../../modules/ability/ability.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]),
    forwardRef(() => AuthModule),
    AbilityModule,
  ],
  exports: [BaseWorkoutService, WorkoutHook],
  providers: [BaseWorkoutService, WorkoutHook],
})
export class BaseWorkoutModule {}
