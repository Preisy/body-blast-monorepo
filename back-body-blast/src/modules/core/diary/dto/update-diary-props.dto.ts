import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class UpdateDiaryPropsRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public label: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(5)
  public value: number;
}
