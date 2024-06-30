import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserModule } from '../core/user/base-user.module';
import { UserEntity } from '../core/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenEntity } from './entities/token.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity, UserEntity]),
    BaseUserModule,
    ConfigModule,
    PassportModule,
    AbilityModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, Repository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
