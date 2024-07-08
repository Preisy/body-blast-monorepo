import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserService } from '../../core/user/base-user.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { BaseDiaryTemplateModule } from '../diary-template/base-diary-template.module';
import { AnthropometricsModule } from '../../anthropometrics/anthropometrics.module';
import { BaseDiaryModule } from '../diary/base-diary.module';
import { BaseNutritionModule } from '../nutrition/base-nutrition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseDiaryTemplateModule),
    forwardRef(() => BaseDiaryModule),
    forwardRef(() => AnthropometricsModule),
    forwardRef(() => BaseNutritionModule),
  ],
  providers: [BaseUserService],
  exports: [BaseUserService],
})
export class BaseUserModule {}
