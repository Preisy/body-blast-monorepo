import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseFoodModule } from '../../../modules/core/food/base-food.module';
import { FoodEntity } from '../../../modules/core/food/entity/food.entity';
import { ClientFoodController } from './client-food.controller';
import { ClientFoodService } from './client-food.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity]), forwardRef(() => AuthModule), forwardRef(() => BaseFoodModule)],
  providers: [ClientFoodService],
  controllers: [ClientFoodController],
})
export class ClientFoodModule {}
