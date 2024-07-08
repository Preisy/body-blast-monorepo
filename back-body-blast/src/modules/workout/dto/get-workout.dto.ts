import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkoutEntity } from '../entity/workout.entity';
import { IsOptional, IsString } from 'class-validator';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AppPagination } from '../../../utils/app-pagination.util';

export class GetWorkoutDTO extends WorkoutEntity {
  @ApiProperty()
  public localeDate: string;
}

export class GetWorkoutForUserByDateRequest extends AppDatePagination.Request {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public userId: string;
}

export class GetWorkoutForUserRequest extends AppPagination.Request {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public userId: string;
}
