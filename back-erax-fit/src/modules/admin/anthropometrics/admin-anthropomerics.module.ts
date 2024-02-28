import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AdminAnthropometricsService } from './admin-anthropometrics.service';
import { AdminAnthropometricsController } from './admin-anthropometrics.controller';
import { BaseAnthropometricsModule } from '../../core/anthropometrics/base-anthropometrics.module';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BaseUserModule } from '../../core/user/base-user.module';
import { BullModule } from '@nestjs/bull';
import { AdminAnthropometricsConsumer } from './admin-anthropometrics.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AnthropometricsEntity]),
    forwardRef(() => AuthModule),
    BaseAnthropometricsModule,
    ScheduleModule,
    BaseUserModule,
    BullModule.registerQueue({
      name: 'anthropometrics',
    }),
  ],
  controllers: [AdminAnthropometricsController],
  providers: [AdminAnthropometricsService, AdminAnthropometricsConsumer],
  exports: [AdminAnthropometricsService],
})
export class AdminAntropometricsModule {}
