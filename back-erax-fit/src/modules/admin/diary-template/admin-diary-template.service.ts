import { Injectable } from '@nestjs/common';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseDiaryTemplateService } from 'src/modules/core/diary-template/base-diary-template.service';
import { DiaryTemplateEntity } from 'src/modules/core/diary-template/entity/diary-template.entity';
import { CreateDiaryTemplateByAdminRequest } from './dto/admin-create-diary-template.dto';
import { UpdateDiaryTemplateByAdminRequest } from './dto/admin-update-diary-template.dto';

@Injectable()
export class AdminDiaryTemplateService {
  constructor(private readonly baseService: BaseDiaryTemplateService) {}

  async create(request: CreateDiaryTemplateByAdminRequest): Promise<AppSingleResponse<DiaryTemplateEntity>> {
    return this.baseService.create(request);
  }

  async findOne(id: DiaryTemplateEntity['id']) {
    return this.baseService.findOne(id);
  }

  async update(id: DiaryTemplateEntity['id'], request: UpdateDiaryTemplateByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: DiaryTemplateEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
