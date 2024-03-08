import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AdminAnthropometricsService } from './admin-anthropometrics.service';
import { AdminAnthropometricsController } from './admin-anthropometrics.controller';
import { BaseAnthropometricsModule } from '../../core/anthropometrics/base-anthropometrics.module';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AnthropometricsEntity]),
    forwardRef(() => AuthModule),
    BaseAnthropometricsModule,
  ],
  controllers: [AdminAnthropometricsController],
  providers: [AdminAnthropometricsService],
  exports: [AdminAnthropometricsService],
})
export class AdminAntropometricsModule {}
