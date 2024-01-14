import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';
import { Repository } from 'typeorm';
import { AdminUserService } from './admin-user.service';
import { BaseUserModule } from '../../core/user/base-user.module';
import { AdminUserController } from './admin-user.controller';
import { AdminAntropometricsModule } from '../anthropometrics/admin-anthropomerics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    AdminAntropometricsModule,
  ],
  providers: [AdminUserService, Repository],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule {}
