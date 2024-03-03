import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetLatestEmptyAnthropometricsResponse {
  @ApiPropertyOptional()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNumber()
  userId: number;

  @ApiPropertyOptional()
  createdAt: Date;
}
