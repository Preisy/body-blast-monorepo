import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { ExerciseEntity } from 'src/modules/core/exerсise/entities/exercise.entity';
import { BaseWorkoutModule } from 'src/modules/core/workout/base-workout.module';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { Repository } from 'typeorm';
import { ClientWorkoutService } from './client-workout.service';
import { ClientWorkoutController } from './client-workout.controller';
import { UserEntity } from 'src/modules/core/user/entities/user.entity';
import { AbilityModule } from 'src/modules/ability/ability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseWorkoutModule),
    AbilityModule,
  ],
  providers: [ClientWorkoutService, Repository],
  controllers: [ClientWorkoutController],
})
export class ClientWorkoutModule {}
