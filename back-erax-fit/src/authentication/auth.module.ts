﻿import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AccessStrategy } from './strategies/access-strategy';
import { RefreshStrategy } from './strategies/refresh-strategy';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity, UserEntity]),
    forwardRef(() => UserModule),
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, AccessStrategy, RefreshStrategy, Repository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
