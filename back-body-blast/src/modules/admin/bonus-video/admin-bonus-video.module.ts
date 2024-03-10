import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserModule } from '../user/admin-user.module';
import { AdminBonusVideoService } from './admin-bonus-video.service';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { AdminBonusVideoController } from './admin-bonus-video.controller';
import { BaseBonusVideoModule } from '../../../modules/core/bonus-video/base-bonus-video.module';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BonusVideoEntity]),
    forwardRef(() => AuthModule),
    AdminUserModule,
    BaseBonusVideoModule,
  ],
  providers: [AdminBonusVideoService],
  controllers: [AdminBonusVideoController],
  exports: [AdminBonusVideoService],
})
export class AdminBonusVideoModule {}
