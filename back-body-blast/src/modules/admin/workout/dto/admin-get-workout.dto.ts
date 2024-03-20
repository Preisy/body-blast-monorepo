import { IsOptional, IsString } from 'class-validator';
import { GetWorkoutDTO } from '../../../../modules/core/workout/dto/get-workout.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';

export class GetWorkoutByAdminDTO extends GetWorkoutDTO {}

export class GetWorkoutForUserByAdminRequest extends AppDatePagination.Request {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public userId: string;
}
