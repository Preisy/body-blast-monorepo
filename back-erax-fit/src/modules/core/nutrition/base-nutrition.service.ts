import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppPagination } from 'src/utils/app-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { FindOptionsRelations, Repository } from 'typeorm';
import { MealItemEntity } from './entity/meal-item.entity';
import { CreateNutritionRequest } from './dto/create-nutrition.dto';
import { UpdateNutritionRequest } from './dto/update-nutrition.dto';
import { NutritionEntity } from './entity/nutrition.entity';

@Injectable()
export class BaseNutritionService {
  constructor(
    @InjectRepository(NutritionEntity)
    private readonly nutritionRepository: Repository<NutritionEntity>,
    @InjectRepository(MealItemEntity)
    private readonly mealItemRepository: Repository<MealItemEntity>,
  ) {}
  public readonly relations: FindOptionsRelations<NutritionEntity> = { user: true, mealItems: true };

  async create(request: CreateNutritionRequest): Promise<AppSingleResponse<NutritionEntity>> {
    const newNutrition = this.nutritionRepository.create({
      ...request,
    });

    const savedNutrition = await this.nutritionRepository.save(newNutrition);

    return new AppSingleResponse(savedNutrition);
  }

  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<NutritionEntity>,
  ): Promise<AppPagination.Response<NutritionEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.nutritionRepository, this.relations);
    return getPaginatedData(query, options);
  }

  async findOne(id: NutritionEntity['id']) {
    const nutrition = await this.nutritionRepository.findOne({
      where: {
        id: id,
      },
      relations: this.relations,
    });

    if (!nutrition) {
      throw MainException.entityNotFound(`Nutrition with id: ${id} not found`);
    }
    return new AppSingleResponse(nutrition);
  }

  async update(id: NutritionEntity['id'], request: UpdateNutritionRequest) {
    const { data: nutrition } = await this.findOne(id);
    if (request.mealItems) {
      await this.mealItemRepository.delete({
        nutritionId: id,
      });
      nutrition.mealItems = [];
    }
    const savedNutrition = await this.nutritionRepository.save({
      ...nutrition,
      ...filterUndefined(request),
    });
    return new AppSingleResponse(savedNutrition);
  }

  async deleteOne(id: NutritionEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.nutritionRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }
}
