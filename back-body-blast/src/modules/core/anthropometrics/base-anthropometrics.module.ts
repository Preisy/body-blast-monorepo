import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';
import { BaseAnthropometrcisService } from './base-anthropometrics.service';
import { AuthModule } from '../../authentication/auth.module';
import { UserEntity } from '../user/entities/user.entity';
import { BaseUserModule } from '../user/base-user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AnthropometricsHook } from './anthropometrics.hook';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AnthropometricsEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
    ScheduleModule,
  ],
  providers: [BaseAnthropometrcisService, AnthropometricsHook],
  exports: [BaseAnthropometrcisService, AnthropometricsHook],
})
export class BaseAnthropometricsModule {}
