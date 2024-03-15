import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsString, Length, ValidateNested } from 'class-validator';
import { CreateMealItemRequest } from './create-meal-item.dto';

export class CreateNutritionRequest {
  @IsDefined()
  @ApiProperty()
  @IsString()
  public userId: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public name: string;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMealItemRequest)
  @ApiProperty({ type: [CreateMealItemRequest] })
  public mealItems: CreateMealItemRequest[];
}
