import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropometricsEntity } from '../../core/antropometrics/entities/anthropometrics.entity';
import { ClientAnthropometricsService } from './client-anthropometrics.service';
import { ClientAnthropometricsController } from './client-anthropometrics.controller';
import { BaseAnthropometricsModule } from '../../core/antropometrics/base-anthropometrics.module';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';
import { MeModule } from '../me/me.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AnthropometricsEntity]),
    forwardRef(() => AuthModule),
    BaseAnthropometricsModule,
    MeModule,
  ],
  controllers: [ClientAnthropometricsController],
  providers: [ClientAnthropometricsService],
  exports: [ClientAnthropometricsService],
})
export class ClientAnthropometricsModule {}
