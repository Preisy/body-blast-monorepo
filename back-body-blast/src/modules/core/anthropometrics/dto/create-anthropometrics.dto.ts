import { IsDefined, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnthropometricsRequest {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @Max(10000)
  public weight: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @Max(10000)
  public waist: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @Max(10000)
  public abdomen: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @Max(10000)
  public shoulder: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @Max(10000)
  public hip: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @Max(10000)
  public hipVolume: number;

  public userId: string;
}
