import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { UpdateDiaryRequest } from '../../../../modules/core/diary/dto/update-diary.dto';

export class UpdateDiaryByClientRequest extends UpdateDiaryRequest {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  public steps: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public activity: string;
}
