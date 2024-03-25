import { ApiProperty } from '@nestjs/swagger';
import { WorkoutEntity } from '../entity/workout.entity';

export class GetWorkoutDTO extends WorkoutEntity {
  @ApiProperty()
  public localeDate: string;
}
