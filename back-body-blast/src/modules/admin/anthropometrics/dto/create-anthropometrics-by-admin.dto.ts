import { ApiProperty } from '@nestjs/swagger';
import { CreateAnthropometricsRequest } from '../../../core/anthropometrics/dto/create-anthropometrics.dto';
import { IsDefined, IsString } from 'class-validator';

export class CreateAnthropometricsByAdminRequest extends CreateAnthropometricsRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  public userId: string;
}
