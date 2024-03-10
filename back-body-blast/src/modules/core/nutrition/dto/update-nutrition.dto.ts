import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNutritionRequest } from './create-nutrition.dto';

export class UpdateNutritionRequest extends PartialType(OmitType(CreateNutritionRequest, ['userId'])) {}
