import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseDiaryTemplateModule } from 'src/modules/core/diary-template/base-diary-template.module';
import { DiaryTemplateEntity } from 'src/modules/core/diary-template/entity/diary-template.entity';
import { AdminDiaryTemplateController } from './admin-diary-template.controller';
import { AdminDiaryTemplateService } from './admin-diary-template.service';
import { SelfControlPropsEntity } from 'src/modules/core/self-control-props/entity/self-control-props.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryTemplateEntity, SelfControlPropsEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseDiaryTemplateModule),
  ],
  providers: [AdminDiaryTemplateService],
  controllers: [AdminDiaryTemplateController],
})
export class AdminDiaryTemplateModule {}
