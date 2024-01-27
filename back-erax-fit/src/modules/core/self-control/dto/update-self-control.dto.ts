import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { UpdateSelfControlPropsRequest } from '../../self-control-props/dto/update-self-control-props.dto';
import { CreateSelfControlRequest } from './create-self-control.dto';

export class UpdateSelfControlRequest extends PartialType(OmitType(CreateSelfControlRequest, ['userId', 'props'])) {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateSelfControlPropsRequest)
  @ApiProperty({ type: [UpdateSelfControlPropsRequest] })
  public props: UpdateSelfControlPropsRequest[];
}
