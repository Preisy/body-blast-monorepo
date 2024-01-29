import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { UpdateDiaryPropsRequest } from '../diary-props/dto/update-diary-props.dto';
import { CreateDiaryRequest } from './create-diary.dto';

export class UpdateDiaryRequest extends PartialType(OmitType(CreateDiaryRequest, ['userId', 'props'])) {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDiaryPropsRequest)
  @ApiProperty({ type: [UpdateDiaryPropsRequest] })
  public props: UpdateDiaryPropsRequest[];
}
