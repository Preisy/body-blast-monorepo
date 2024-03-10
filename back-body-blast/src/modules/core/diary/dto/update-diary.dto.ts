import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateDiaryPropsRequest } from './update-diary-props.dto';

export class UpdateDiaryRequest {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateDiaryPropsRequest)
  @ApiProperty({ type: [UpdateDiaryPropsRequest] })
  public props: UpdateDiaryPropsRequest[];
}
