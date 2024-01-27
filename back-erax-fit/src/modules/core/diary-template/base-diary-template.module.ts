import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { TemplatePropsEntity } from '../template-props/entity/template-props.entity';
import { BaseUserModule } from '../user/base-user.module';
import { UserEntity } from '../user/entities/user.entity';
import { BaseDiaryTemplateService } from './base-diary-template.service';
import { DiaryTemplateEntity } from './entity/diary-template.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryTemplateEntity, TemplatePropsEntity, UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
  ],
  exports: [BaseDiaryTemplateService],
  providers: [BaseDiaryTemplateService],
})
export class BaseDiaryTemplateModule {}
