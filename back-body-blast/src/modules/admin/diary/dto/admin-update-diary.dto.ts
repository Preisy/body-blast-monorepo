import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { UpdateDiaryRequest } from '../../../../modules/core/diary/dto/update-diary.dto';

export class UpdateDiaryByAdminRequest extends UpdateDiaryRequest {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Min(1)
  public cycle?: number;
}
