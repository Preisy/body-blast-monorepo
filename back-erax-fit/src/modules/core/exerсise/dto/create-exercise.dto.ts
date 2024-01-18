import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateExerciseRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public name: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0.125)
  public weight: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  public sets: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Length(1, 50)
  public repetitions: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  public restTime: number;

  @IsDefined()
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  public pace: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  public photoLink: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  public videoLink: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 512)
  public trainerComment?: string;
}
