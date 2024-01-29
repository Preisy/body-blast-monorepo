import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';

export class CreateDiaryPropsRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public label: string;
}
