import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';
import { Repository } from 'typeorm';
import { MeService } from './me.service';
import { BaseUserModule } from '../../core/user/base-user.module';
import { MeController } from './me.controller';
import { ClientDiaryModule } from '../diary/client-diary.module';
import { AnthropometricsModule } from '../../anthropometrics/anthropometrics.module';
import { BaseDiaryModule } from '../../../modules/core/diary/base-diary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    ClientDiaryModule,
    AnthropometricsModule,
    BaseDiaryModule,
  ],
  controllers: [MeController],
  providers: [MeService, Repository],
  exports: [MeService],
})
export class MeModule {}
