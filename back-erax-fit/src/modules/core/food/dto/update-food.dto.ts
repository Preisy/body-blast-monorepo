import { PartialType } from '@nestjs/swagger';
import { CreateFoodRequest } from './create-food.dto';

export class UpdateFoodRequest extends PartialType(CreateFoodRequest) {}
