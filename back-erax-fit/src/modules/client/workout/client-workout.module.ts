import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { ExerciseEntity } from 'src/modules/core/exerсise/entities/exercise.entity';
import { BaseWorkoutModule } from 'src/modules/core/workout/base-workout.module';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ClientWorkoutService } from './client-workout.service';
import { ClientWorkoutController } from './client-workout.controller';

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
