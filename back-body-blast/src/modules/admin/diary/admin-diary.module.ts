import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseDiaryModule } from '../../../modules/core/diary/base-diary.module';
import { DiaryEntity } from '../../../modules/core/diary/entity/diary.entity';
import { AdminDiaryService } from './admin-diary.service';
import { AdminDiaryController } from './admin-diary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity]), forwardRef(() => AuthModule), BaseDiaryModule],
  providers: [AdminDiaryService],
  controllers: [AdminDiaryController],
  exports: [AdminDiaryService],
})
export class AdminDiaryModule {}
