import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsNumber, Max, Min } from 'class-validator';
import { CreateDiaryPropsRequest } from './create-diary-props.dto';

export class UpdateDiaryPropsRequest extends PartialType(CreateDiaryPropsRequest) {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(5)
  public value: number;
}
