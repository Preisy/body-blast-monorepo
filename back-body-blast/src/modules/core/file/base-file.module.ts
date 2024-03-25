import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileEntity } from './entity/file.entity';
import { BaseFileService } from './base-file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  exports: [BaseFileService],
  providers: [BaseFileService],
})
export class BaseFileModule {}
