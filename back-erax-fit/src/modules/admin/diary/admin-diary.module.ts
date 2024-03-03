import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseDiaryTemplateModule } from 'src/modules/core/diary-template/base-diary-template.module';
import { BaseDiaryModule } from 'src/modules/core/diary/base-diary.module';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { BaseUserModule } from 'src/modules/core/user/base-user.module';
import { BaseWorkoutModule } from 'src/modules/core/workout/base-workout.module';
import { AdminDiaryService } from './admin-diary.service';
import { AdminDiaryController } from './admin-diary.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryEntity]),
    forwardRef(() => AuthModule),
    BaseUserModule,
    BaseDiaryTemplateModule,
    BaseWorkoutModule,
    BaseDiaryModule,
  ],
  providers: [AdminDiaryService],
  controllers: [AdminDiaryController],
  exports: [AdminDiaryService],
})
export class AdminDiaryModule {}
