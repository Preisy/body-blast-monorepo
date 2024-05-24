import { Injectable } from '@nestjs/common';
import { BaseDiaryTemplateService } from 'src/modules/core/diary-template/base-diary-template.service';
import { DiaryTemplateEntity } from 'src/modules/core/diary-template/entity/diary-template.entity';
import { UpdateDiaryTemplateByAdminRequest } from './dto/admin-update-diary-template.dto';
import { UserEntity } from 'src/modules/core/user/entities/user.entity';

@Injectable()
export class AdminDiaryTemplateService {
  constructor(private readonly baseService: BaseDiaryTemplateService) {}

  async findOne(userId: UserEntity['id']) {
    return this.baseService.findOneByUserId(userId);
  }

  async update(userId: UserEntity['id'], request: UpdateDiaryTemplateByAdminRequest) {
    return this.baseService.update(userId, request);
  }
}
