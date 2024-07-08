import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { ExerciseEntity } from 'src/modules/core/exerсise/entities/exercise.entity';
import { UserEntity } from 'src/modules/core/user/entities/user.entity';
import { BaseWorkoutModule } from 'src/modules/core/workout/base-workout.module';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { AdminWorkoutController } from './admin-workout.controller';
import { AdminWorkoutService } from './admin-workout.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]),
    forwardRef(() => AuthModule),
    BaseWorkoutModule,
  ],
  providers: [AdminWorkoutService],
  controllers: [AdminWorkoutController],
})
export class AdminWorkoutModule {}
