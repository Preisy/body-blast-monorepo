import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserModule } from '../../core/user/base-user.module';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AdminAntropometricsModule } from '../anthropometrics/admin-anthropomerics.module';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { AdminDiaryModule } from '../diary/admin-diary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DiaryEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    AdminAntropometricsModule,
    AdminDiaryModule,
  ],
  providers: [AdminUserService],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule {}
