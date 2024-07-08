import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseRequest } from '../../core/exerсise/dto/create-exercise.dto';

export class CreateWorkoutRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public name: string;

  @IsDefined()
  @IsDateString()
  @ApiProperty({ example: '2023-01-01' })
  @Length(1, 255)
  public date: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 512)
  public comment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  @Min(1)
  @Max(8000)
  public cycle?: number;

  @IsDefined()
  @ApiProperty()
  @IsString()
  public userId: string;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseRequest)
  @ApiProperty({ type: [CreateExerciseRequest] })
  public exercises: CreateExerciseRequest[];
}
