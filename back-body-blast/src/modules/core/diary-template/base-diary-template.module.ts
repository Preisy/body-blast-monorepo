import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseUserModule } from '../user/base-user.module';
import { UserEntity } from '../user/entities/user.entity';
import { BaseDiaryTemplateService } from './base-diary-template.service';
import { DiaryTemplatePropsEntity } from './entity/diary-template-props.entity';
import { DiaryTemplateEntity } from './entity/diary-template.entity';
import { BaseUserService } from '../user/base-user.service';
import { AnthropometricsModule } from '../../anthropometrics/anthropometrics.module';
import { BaseDiaryModule } from '../diary/base-diary.module';
import { BaseNutritionModule } from '../nutrition/base-nutrition.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryTemplateEntity, DiaryTemplatePropsEntity, UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
    AnthropometricsModule,
    forwardRef(() => BaseDiaryModule),
    BaseNutritionModule,
  ],
  exports: [BaseDiaryTemplateService],
  providers: [BaseDiaryTemplateService, BaseUserService],
})
export class BaseDiaryTemplateModule {}
