import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseFoodModule } from 'src/modules/core/food/base-food.module';
import { FoodEntity } from 'src/modules/core/food/entity/food.entity';
import { ClientFoodController } from './client-food.controller';
import { ClientFoodService } from './client-food.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity]), forwardRef(() => AuthModule), forwardRef(() => BaseFoodModule)],
  providers: [ClientFoodService],
  controllers: [ClientFoodController],
})
export class ClientFoodModule {}
