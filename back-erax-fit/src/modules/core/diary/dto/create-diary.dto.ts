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
import { CreateDiaryPropsRequest } from '../diary-props/dto/create-diary-props.dto';

export class CreateDiaryRequest {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDiaryPropsRequest)
  @ApiProperty({ type: [CreateDiaryPropsRequest] })
  public props: CreateDiaryPropsRequest[];

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
