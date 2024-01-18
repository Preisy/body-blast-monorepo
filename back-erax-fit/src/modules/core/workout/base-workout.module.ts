import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { ExerciseEntity } from '../exerсise/entities/exercise.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BaseWorkoutService } from './base-workout.service';
@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]), forwardRef(() => AuthModule)],
  exports: [BaseWorkoutService],
  providers: [BaseWorkoutService],
})
export class BaseWorkoutModule {}
