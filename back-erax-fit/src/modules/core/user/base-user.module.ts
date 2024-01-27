import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserService } from '../../core/user/base-user.service';
import { UserEntity } from '../../core/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
  providers: [BaseUserService],
  exports: [BaseUserService],
})
export class BaseUserModule {}
