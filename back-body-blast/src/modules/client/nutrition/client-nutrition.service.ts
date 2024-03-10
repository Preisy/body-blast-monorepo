import { Injectable } from '@nestjs/common';
import { BaseNutritionService } from '../../../modules/core/nutrition/base-nutrition.service';
import { NutritionEntity } from '../../../modules/core/nutrition/entity/nutrition.entity';
import { AppPagination } from '../../../utils/app-pagination.util';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';

@Injectable()
export class ClientNutritionService {
  constructor(private readonly baseService: BaseNutritionService) {}

  async findAll(
    userId: WorkoutEntity['userId'],
    query: AppPagination.Request,
  ): Promise<AppPagination.Response<NutritionEntity>> {
    return this.baseService.findAll(query, {
      where: {
        userId,
      },
    });
  }
}