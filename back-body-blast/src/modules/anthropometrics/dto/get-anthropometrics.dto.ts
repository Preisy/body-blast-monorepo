import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

export class GetAnthropometricsForUserRequest extends AppDatePagination.Request {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public userId: string;
}
