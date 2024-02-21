import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileEntity } from '../../../modules/core/file/entity/file.entity';
import { BaseFileModule } from '../../../modules/core/file/base-file.module';
import { ClientFileController } from './client-file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './uploads',
    }),
    forwardRef(() => BaseFileModule),
  ],
  controllers: [ClientFileController],
})
export class ClientFileModule {}
