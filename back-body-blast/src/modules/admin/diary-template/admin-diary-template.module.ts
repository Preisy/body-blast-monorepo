import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseDiaryTemplateModule } from 'src/modules/core/diary-template/base-diary-template.module';
import { DiaryTemplateEntity } from 'src/modules/core/diary-template/entity/diary-template.entity';
import { AdminDiaryTemplateService } from './admin-diary-template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryTemplateEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseDiaryTemplateModule),
  ],
  providers: [AdminDiaryTemplateService],
  exports: [AdminDiaryTemplateService],
})
export class AdminDiaryTemplateModule {}
