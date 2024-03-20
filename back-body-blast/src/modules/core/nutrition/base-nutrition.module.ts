import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseNutritionService } from './base-nutrition.service';
import { MealItemEntity } from './entity/meal-item.entity';
import { NutritionEntity } from './entity/nutrition.entity';
@Module({
  imports: [TypeOrmModule.forFeature([NutritionEntity, MealItemEntity]), forwardRef(() => AuthModule)],
  exports: [BaseNutritionService],
  providers: [BaseNutritionService],
})
export class BaseNutritionModule {}
