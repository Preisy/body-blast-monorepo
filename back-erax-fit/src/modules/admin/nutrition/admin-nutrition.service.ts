import { Injectable } from '@nestjs/common';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseNutritionService } from 'src/modules/core/nutrition/base-nutrition.service';
import { NutritionEntity } from 'src/modules/core/nutrition/entity/nutrition.entity';
import { AppPagination } from 'src/utils/app-pagination.util';
import { CreateNutritionByAdminRequest } from './dto/admin-create-nutrition.dto';
import { UpdateNutritionByAdminRequest } from './dto/admin-update-nutrition.dto';

@Injectable()
export class AdminNutritionService {
  constructor(private readonly baseService: BaseNutritionService) {}

  async create(request: CreateNutritionByAdminRequest): Promise<AppSingleResponse<NutritionEntity>> {
    return this.baseService.create(request);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<NutritionEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: NutritionEntity['id']) {
    return this.baseService.findOne(id);
  }

  async update(id: NutritionEntity['id'], request: UpdateNutritionByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: NutritionEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
