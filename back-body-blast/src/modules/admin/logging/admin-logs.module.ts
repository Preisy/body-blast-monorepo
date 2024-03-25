import { Module, forwardRef } from '@nestjs/common';
import { AdminLogsController } from './admin-logs.controller';
import { AuthModule } from '../../../modules/authentication/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AdminLogsController],
})
export class AdminLogsModule {}
