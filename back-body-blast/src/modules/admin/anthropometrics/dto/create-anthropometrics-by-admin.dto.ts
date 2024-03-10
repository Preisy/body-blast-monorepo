import { ApiProperty } from '@nestjs/swagger';
import { CreateAnthropometricsRequest } from '../../../core/anthropometrics/dto/create-anthropometrics.dto';
import { IsDefined, IsNumber, Min } from 'class-validator';

export class CreateAnthropometricsByAdminRequest extends CreateAnthropometricsRequest {
  @ApiProperty()
  @IsDefined()
  @Min(0)
  @IsNumber()
  public userId: number;
}
