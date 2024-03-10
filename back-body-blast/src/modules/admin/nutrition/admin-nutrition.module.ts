import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseNutritionModule } from 'src/modules/core/nutrition/base-nutrition.module';
import { MealItemEntity } from 'src/modules/core/nutrition/entity/meal-item.entity';
import { NutritionEntity } from 'src/modules/core/nutrition/entity/nutrition.entity';
import { AdminNutritionController } from './admin-nutrition.controller';
import { AdminNutritionService } from './admin-nutrition.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NutritionEntity, MealItemEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseNutritionModule),
  ],
  providers: [AdminNutritionService],
  controllers: [AdminNutritionController],
})
export class AdminNutritionModule {}
