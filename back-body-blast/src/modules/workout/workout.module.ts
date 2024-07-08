import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../authentication/auth.module';
import { WorkoutEntity } from './entity/workout.entity';
import { ExerciseEntity } from '../core/exerсise/entities/exercise.entity';
import { UserEntity } from '../core/user/entities/user.entity';
import { WorkoutService } from './workout.service';
import { WorkoutHook } from './workout.hook';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]), forwardRef(() => AuthModule)],
  controllers: [WorkoutController],
  exports: [WorkoutService, WorkoutHook],
  providers: [WorkoutService, WorkoutHook],
})
export class WorkoutModule {}
