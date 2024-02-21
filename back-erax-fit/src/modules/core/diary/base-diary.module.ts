import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseUserModule } from '../user/base-user.module';
import { DiaryPropsEntity } from './entity/diary-props.entity';
import { DiaryEntity } from './entity/diary.entity';
import { BaseDiaryService } from './base-diary.service';
@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity, DiaryPropsEntity]), forwardRef(() => AuthModule), BaseUserModule],
  exports: [BaseDiaryService],
  providers: [BaseDiaryService],
})
export class BaseDiaryModule {}
