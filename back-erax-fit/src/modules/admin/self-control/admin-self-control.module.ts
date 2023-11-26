import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseDiaryTemplateModule } from 'src/modules/core/diary-template/base-diary-template.module';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { BaseUserModule } from 'src/modules/core/user/base-user.module';
import { BaseWorkoutModule } from 'src/modules/core/workout/base-workout.module';
import { AdminSelfControlService } from './admin-self-control.service';
import { AdminSelfControlController } from './admin-self-control.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SelfControlEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    BaseDiaryTemplateModule,
    BaseWorkoutModule,
  ],
  providers: [AdminSelfControlService],
  controllers: [AdminSelfControlController],
  exports: [AdminSelfControlService],
})
export class AdminSelfControlModule {}
