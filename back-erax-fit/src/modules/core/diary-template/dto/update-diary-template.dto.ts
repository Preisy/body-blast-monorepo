import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { UpdateDiaryTemplatePropsRequest } from './update-diary-template-props.dto';

export class UpdateDiaryTemplateRequest {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDiaryTemplatePropsRequest)
  @ApiProperty({ type: [UpdateDiaryTemplatePropsRequest] })
  public props: UpdateDiaryTemplatePropsRequest[];
}
