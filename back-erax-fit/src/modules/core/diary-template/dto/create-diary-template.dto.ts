import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsNumber, Min, ValidateNested } from 'class-validator';
import { CreateTemplatePropsRequest } from '../../template-props/dto/create-template-props.dto';

export class CreateDiaryTemplateRequest {
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public userId: number;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplatePropsRequest)
  @ApiProperty({ type: [CreateTemplatePropsRequest] })
  public props: CreateTemplatePropsRequest[];
}
