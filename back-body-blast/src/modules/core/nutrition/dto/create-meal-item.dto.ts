import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateMealItemRequest {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(3)
  public category: number;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public type: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public quantity: string;
}
