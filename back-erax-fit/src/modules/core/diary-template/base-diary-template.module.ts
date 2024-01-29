import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseUserModule } from '../user/base-user.module';
import { UserEntity } from '../user/entities/user.entity';
import { BaseDiaryTemplateService } from './base-diary-template.service';
import { DiaryTemplatePropsEntity } from './diary-template-props/entity/diary-template-props.entity';
import { DiaryTemplateEntity } from './entity/diary-template.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryTemplateEntity, DiaryTemplatePropsEntity, UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
  ],
  exports: [BaseDiaryTemplateService],
  providers: [BaseDiaryTemplateService],
})
export class BaseDiaryTemplateModule {}
