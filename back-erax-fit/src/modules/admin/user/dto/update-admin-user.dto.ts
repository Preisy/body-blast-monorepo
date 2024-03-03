import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';
import { IsBoolean, Min, Max, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserByAdminRequest extends UpdateUserRequest {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public canWatchVideo: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(14)
  @ApiPropertyOptional()
  public anthrpJobPeriod: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  public stepsGoal: number;
}
