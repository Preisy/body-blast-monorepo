import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserModule } from '../../core/user/base-user.module';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AdminAntropometricsModule } from '../anthropometrics/admin-anthropomerics.module';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { AdminSelfControlModule } from '../self-control/admin-self-control.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SelfControlEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    AdminAntropometricsModule,
    AdminSelfControlModule,
  ],
  providers: [AdminUserService],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule {}
