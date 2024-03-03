import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetLatestEmptyAnthropometricsResponse {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNumber()
  userId: number;

  @ApiPropertyOptional()
  createdAt: Date;
}
