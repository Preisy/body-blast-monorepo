import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseDiaryModule } from 'src/modules/core/diary/base-diary.module';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { ClientDiaryService } from './client-diary.service';
import { ClientDiaryController } from './client-diary.cotroller';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity]), forwardRef(() => AuthModule), BaseDiaryModule],
  providers: [ClientDiaryService],
  controllers: [ClientDiaryController],
  exports: [ClientDiaryService],
})
export class ClientDiaryModule {}
