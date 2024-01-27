import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseSelfControlModule } from 'src/modules/core/self-control/base-self-control.module';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { ClientSelfControlController } from './client-self-control.cotroller';
import { ClientSelfControlService } from './client-self-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([SelfControlEntity]), forwardRef(() => AuthModule), BaseSelfControlModule],
  providers: [ClientSelfControlService],
  controllers: [ClientSelfControlController],
  exports: [ClientSelfControlService],
})
export class ClientSelfControlModule {}
