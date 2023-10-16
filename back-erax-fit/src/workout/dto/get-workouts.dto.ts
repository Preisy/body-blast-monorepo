import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional } from 'class-validator';
import { WorkoutEntity } from '../entity/workout.entity';

export class GetWorkoutsRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public expanded?: boolean;

  constructor(expanded = false, page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
    this.expanded = expanded;
  }
}

export class GetWorkoutsResponse {
  @ApiProperty({ type: [WorkoutEntity] })
  public workouts: WorkoutEntity[];

  @ApiProperty()
  public count: number;

  constructor(workouts: WorkoutEntity[], count: number) {
    this.workouts = workouts;
    this.count = count;
  }
}
