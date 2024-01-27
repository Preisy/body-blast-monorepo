import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDateString,
  IsDefined,
  IsNumber,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateSelfControlPropsRequest } from '../../self-control-props/dto/create-self-control-props.dto';

export class CreateSelfControlRequest {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSelfControlPropsRequest)
  @ApiProperty({ type: [CreateSelfControlPropsRequest] })
  public props: CreateSelfControlPropsRequest[];

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  public userId: number;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public behaviour: string;

  @IsDefined()
  @IsDateString()
  @ApiProperty({ example: '2023-01-01' })
  @Length(1, 255)
  public date: string;
}
