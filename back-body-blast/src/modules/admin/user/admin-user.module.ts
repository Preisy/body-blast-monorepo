import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserModule } from '../../core/user/base-user.module';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { DiaryEntity } from '../../../modules/core/diary/entity/diary.entity';
import { AdminDiaryModule } from '../diary/admin-diary.module';
import { DiaryTemplateEntity } from '../../../modules/core/diary-template/entity/diary-template.entity';
import { AdminDiaryTemplateModule } from '../diary-template/admin-diary-template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DiaryEntity, DiaryTemplateEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    AdminDiaryModule,
    AdminDiaryTemplateModule,
  ],
  providers: [AdminUserService],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule {}
