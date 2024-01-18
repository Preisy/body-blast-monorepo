import { Injectable } from '@nestjs/common';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseFoodService } from 'src/modules/core/food/base-food.service';
import { FoodEntity } from 'src/modules/core/food/entity/food.entity';
import { AppPagination } from 'src/utils/app-pagination.util';
import { CreateFoodByAdminRequest } from './dto/admin-create-food.dto';
import { UpdateFoodByAdminRequest } from './dto/admin-update-food.dto';

@Injectable()
export class AdminFoodService {
  constructor(private readonly baseService: BaseFoodService) {}

  async create(request: CreateFoodByAdminRequest): Promise<AppSingleResponse<FoodEntity>> {
    return this.baseService.create(request);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<FoodEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: FoodEntity['id']) {
    return this.baseService.findOne(id);
  }

  async update(id: FoodEntity['id'], request: UpdateFoodByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: FoodEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
