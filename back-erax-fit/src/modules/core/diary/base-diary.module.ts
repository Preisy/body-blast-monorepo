import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseUserModule } from '../user/base-user.module';
import { DiaryPropsEntity } from './entity/diary-props.entity';
import { DiaryEntity } from './entity/diary.entity';
import { BaseDiaryService } from './base-diary.service';
import { UserEntity } from '../user/entities/user.entity';
import { BaseWorkoutModule } from '../workout/base-workout.module';
import { BaseDiaryTemplateModule } from '../diary-template/base-diary-template.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryEntity, DiaryPropsEntity, UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
    BaseWorkoutModule,
    forwardRef(() => BaseDiaryTemplateModule),
  ],
  exports: [BaseDiaryService],
  providers: [BaseDiaryService],
})
export class BaseDiaryModule {}
