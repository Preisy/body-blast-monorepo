import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeModule } from '../me/me.module';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { ClientBonusVideoController } from './client-bonus-video.controller';
import { BaseBonusVideoModule } from '../../../modules/core/bonus-video/base-bonus-video.module';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { ClientBonusVideoService } from './client-bonus-video.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BonusVideoEntity]),
    forwardRef(() => AuthModule),
    MeModule,
    BaseBonusVideoModule,
  ],
  providers: [ClientBonusVideoService],
  controllers: [ClientBonusVideoController],
  exports: [ClientBonusVideoService],
})
export class ClientBonusVideoModule {}
