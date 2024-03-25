import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { FileEntity } from '../file/entity/file.entity';
import { BasePromptService } from './base-prompt.service';
import { PromptEntity } from './entity/prompt.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PromptEntity, FileEntity]), forwardRef(() => AuthModule)],
  exports: [BasePromptService],
  providers: [BasePromptService],
})
export class BasePromptModule {}
