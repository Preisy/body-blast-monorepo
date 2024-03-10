import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseFoodModule } from '../../../modules/core/food/base-food.module';
import { PromptEntity } from '../../../modules/core/prompt/entity/prompt.entity';
import { AdminFoodController } from './admin-food.controller';
import { AdminFoodService } from './admin-food.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromptEntity]), forwardRef(() => AuthModule), forwardRef(() => BaseFoodModule)],
  providers: [AdminFoodService],
  controllers: [AdminFoodController],
})
export class AdminFoodModule {}
