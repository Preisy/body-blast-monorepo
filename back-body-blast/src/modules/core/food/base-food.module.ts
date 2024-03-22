import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseFoodService } from './base-food.service';
import { FoodEntity } from './entity/food.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity]), forwardRef(() => AuthModule)],
  exports: [BaseFoodService],
  providers: [BaseFoodService],
})
export class BaseFoodModule {}
