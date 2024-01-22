import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';
import { Repository } from 'typeorm';
import { MeService } from './me.service';
import { BaseUserModule } from '../../core/user/base-user.module';
import { MeController } from './me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule), BaseUserModule],
  controllers: [MeController],
  providers: [MeService, Repository],
  exports: [MeService],
})
export class MeModule {}
