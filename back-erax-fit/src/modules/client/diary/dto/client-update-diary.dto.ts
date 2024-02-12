import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, Length, Min } from 'class-validator';
import { UpdateDiaryRequest } from 'src/modules/core/diary/dto/update-diary.dto';

export class UpdateDiaryByClientRequest extends UpdateDiaryRequest {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  public steps: number;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public activity: string;
}
