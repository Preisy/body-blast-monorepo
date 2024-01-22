import { IsNumberString, IsOptional } from 'class-validator';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAnthropometricsForUserByAdminRequest extends AppDatePagination.Request {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public id: number;
}
