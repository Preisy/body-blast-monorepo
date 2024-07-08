import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';
import { AnthropometricsService } from './anthropometrics.service';
import { AuthModule } from '../authentication/auth.module';
import { UserEntity } from '../core/user/entities/user.entity';
import { BaseUserModule } from '../core/user/base-user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AnthropometricsHook } from './anthropometrics.hook';
import { AnthropometricsController } from './anthropometrics.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AnthropometricsEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
    ScheduleModule,
  ],
  controllers: [AnthropometricsController],
  providers: [AnthropometricsService, AnthropometricsHook],
  exports: [AnthropometricsService, AnthropometricsHook],
})
export class AnthropometricsModule {}
