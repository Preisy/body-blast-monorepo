import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';

export class CreateSelfControlPropsRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public label: string;
}
