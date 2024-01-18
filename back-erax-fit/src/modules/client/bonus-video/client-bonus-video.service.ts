import { BaseBonusVideoService } from '../../../modules/core/bonus-video/base-bonus-video.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientBonusVideoService {
  constructor(private readonly baseService: BaseBonusVideoService) {}

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<BonusVideoEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: BonusVideoEntity['id']) {
    return this.baseService.findOne(id);
  }
}
