import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserService } from '../../core/user/base-user.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { BaseDiaryTemplateModule } from '../diary-template/base-diary-template.module';
import { BaseAnthropometricsModule } from '../anthropometrics/base-anthropometrics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseDiaryTemplateModule),
    BaseAnthropometricsModule,
  ],
  providers: [BaseUserService],
  exports: [BaseUserService],
})
export class BaseUserModule {}
