import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseDiaryTemplateModule } from '../../../modules/core/diary-template/base-diary-template.module';
import { BaseDiaryModule } from '../../../modules/core/diary/base-diary.module';
import { DiaryEntity } from '../../../modules/core/diary/entity/diary.entity';
import { BaseUserModule } from '../../../modules/core/user/base-user.module';
import { BaseWorkoutModule } from '../../../modules/core/workout/base-workout.module';
import { AdminDiaryService } from './admin-diary.service';
import { AdminDiaryController } from './admin-diary.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    BaseDiaryTemplateModule,
    BaseWorkoutModule,
    BaseDiaryModule,
    BullModule.registerQueue({
      name: 'diary',
    }),
  ],
  providers: [AdminDiaryService],
  controllers: [AdminDiaryController],
  exports: [AdminDiaryService],
})
export class AdminDiaryModule {}
