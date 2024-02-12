import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { UpdateDiaryPropsRequest } from './update-diary-props.dto';

export class UpdateDiaryRequest {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDiaryPropsRequest)
  @ApiProperty({ type: [UpdateDiaryPropsRequest] })
  public props: UpdateDiaryPropsRequest[];
}
