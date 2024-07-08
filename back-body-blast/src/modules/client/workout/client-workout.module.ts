import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { ExerciseEntity } from '../../../modules/core/exerсise/entities/exercise.entity';
import { BaseWorkoutModule } from '../../../modules/core/workout/base-workout.module';
import { WorkoutEntity } from '../../../modules/core/workout/entity/workout.entity';
import { Repository } from 'typeorm';
import { ClientWorkoutService } from './client-workout.service';
import { ClientWorkoutController } from './client-workout.controller';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseWorkoutModule),
  ],
  providers: [ClientWorkoutService, Repository],
  controllers: [ClientWorkoutController],
})
export class ClientWorkoutModule {}
