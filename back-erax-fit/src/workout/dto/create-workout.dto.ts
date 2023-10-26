import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDateString, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { WorkoutEntity } from '../entities/workout.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';

export class CreateWorkoutRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsDefined()
  @IsDateString()
  @ApiProperty()
  public date: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public comment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public loop?: number;

  @IsDefined()
  @ApiProperty()
  public userId: number;

  @IsDefined()
  @ApiProperty()
  public exercises: ExerciseEntity[];

  constructor(
    name: string,
    date: string,
    userId: number,
    exercises: ExerciseEntity[],
    comment?: string,
    loop?: number,
  ) {
    this.name = name;
    this.date = date;
    this.userId = userId;
    this.exercises = exercises;
    this.comment = comment;
    this.loop = loop;
  }
}

export class CreateWorkoutResponse {
  @ApiProperty({ type: WorkoutEntity })
  public workout: WorkoutEntity;

  constructor(workout: WorkoutEntity) {
    this.workout = workout;
  }
}
