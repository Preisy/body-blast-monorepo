import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { UpdateDiaryRequest } from 'src/modules/core/diary/dto/update-diary.dto';

export class UpdateDiaryByAdminRequest extends UpdateDiaryRequest {
  @IsNumber()
  @ApiProperty()
  @Min(1)
  public cycle?: number;
}
