import { Injectable } from '@nestjs/common';
import { BaseBonusVideoService } from '../../../modules/core/bonus-video/base-bonus-video.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { CreateVideoByAdminRequest } from './dto/admin-create-video.dto';

@Injectable()
export class AdminBonusVideoService {
  constructor(private readonly baseService: BaseBonusVideoService) {}

  async create(request: CreateVideoByAdminRequest) {
    return this.baseService.create(request);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<BonusVideoEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: BonusVideoEntity['id']) {
    return this.baseService.findOne(id);
  }

  async delete(id: BonusVideoEntity['id']) {
    return this.baseService.delete(id);
  }
}
