import { Module, forwardRef } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AdminLogsController } from './admin-logs.controller';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { AdminLogsService } from './admin-logs.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './logs',
    }),
  ],
  providers: [AdminLogsService],
  controllers: [AdminLogsController],
})
export class AdminLogsModule {}
