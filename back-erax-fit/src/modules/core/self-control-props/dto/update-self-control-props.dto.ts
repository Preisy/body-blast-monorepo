import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsNumber, Max, Min } from 'class-validator';
import { CreateSelfControlPropsRequest } from './create-self-control-props.dto';

export class UpdateSelfControlPropsRequest extends PartialType(CreateSelfControlPropsRequest) {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(5)
  public value: number;
}
