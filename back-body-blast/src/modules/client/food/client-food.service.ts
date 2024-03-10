import { Injectable } from '@nestjs/common';
import { BaseFoodService } from '../../../modules/core/food/base-food.service';
import { FoodEntity } from '../../../modules/core/food/entity/food.entity';
import { AppPagination } from '../../../utils/app-pagination.util';

@Injectable()
export class ClientFoodService {
  constructor(private readonly baseService: BaseFoodService) {}

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<FoodEntity>> {
    return this.baseService.findAll(query);
  }
}
