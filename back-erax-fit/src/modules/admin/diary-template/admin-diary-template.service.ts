import { Injectable } from '@nestjs/common';
import { BaseDiaryTemplateService } from 'src/modules/core/diary-template/base-diary-template.service';
import { DiaryTemplateEntity } from 'src/modules/core/diary-template/entity/diary-template.entity';
import { UpdateDiaryTemplateByAdminRequest } from './dto/admin-update-diary-template.dto';

@Injectable()
export class AdminDiaryTemplateService {
  constructor(private readonly baseService: BaseDiaryTemplateService) {}

  async findOne(id: DiaryTemplateEntity['id']) {
    return this.baseService.findOne(id);
  }

  async update(id: DiaryTemplateEntity['id'], request: UpdateDiaryTemplateByAdminRequest) {
    return this.baseService.update(id, request);
  }
}
