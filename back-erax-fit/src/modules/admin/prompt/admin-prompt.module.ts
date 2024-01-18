import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BasePromptModule } from 'src/modules/core/prompt/base-prompt.module';
import { PromptEntity } from 'src/modules/core/prompt/entity/prompt.entity';
import { AdminPromptService } from './admin-prompt.service';
import { AdminPromptController } from './admin-prompt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PromptEntity]), forwardRef(() => AuthModule), forwardRef(() => BasePromptModule)],
  providers: [AdminPromptService],
  controllers: [AdminPromptController],
})
export class AdminPromptModule {}
