import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { FindOptionsRelations, Repository } from 'typeorm';
import { MealItemEntity } from './entity/meal-item.entity';
import { CreateNutritionRequest } from './dto/create-nutrition.dto';
import { UpdateNutritionRequest } from './dto/update-nutrition.dto';
import { NutritionEntity } from './entity/nutrition.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateMealItemRequest } from './dto/create-meal-item.dto';

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
  async createDefault(userId: UserEntity['id']): Promise<AppSingleResponse<NutritionEntity>> {
    let mealItems: CreateMealItemRequest[] = [
      { category: 1, type: 'Хлеб', quantity: '50 грамм' },
      { category: 1, type: 'Крупа (1 кат.)', quantity: '100 грамм' },
      { category: 1, type: 'Фрукты/Ягоды (1,2 кат.)', quantity: '200 грамм' },
      { category: 1, type: 'Шоколад', quantity: '150 грамм' },
      { category: 2, type: 'Яйцо', quantity: '1 шт' },
      { category: 2, type: 'Творог', quantity: '50 грамм' },
      { category: 2, type: 'Молоко', quantity: '200 мл' },
      { category: 2, type: 'Кефир/ряженка', quantity: '200 мл' },
      { category: 3, type: 'Масло сливочное', quantity: '10 грамм' },
      { category: 3, type: 'Сыр', quantity: '25 грамм' },
    ];

    let newNutrition = this.nutritionRepository.create({
      userId,
      name: 'Завтрак',
      mealItems,
    });
    let savedNutrition = await this.nutritionRepository.save(newNutrition);

    mealItems = [
      { category: 1, type: 'Фрукты/Ягоды (1,2 кат.)', quantity: '50 грамм' },
      { category: 1, type: 'Шоколад (не менее 40%)', quantity: '25 грамм' },
      { category: 2, type: 'Овощи (1,2 кат.)', quantity: '1 шт' },
    ];

    newNutrition = this.nutritionRepository.create({
      userId,
      name: 'Перекус',
      mealItems,
    });
    savedNutrition = await this.nutritionRepository.save(newNutrition);

    mealItems = [
      { category: 1, type: 'Хлеб', quantity: '50 грамм' },
      { category: 1, type: 'Крупа (1 кат.)', quantity: '100 грамм' },
      { category: 1, type: 'Овощи', quantity: '300 грамм' },
      { category: 1, type: 'Мак. изд. Т/c', quantity: '300 грамм' },
      { category: 2, type: 'Белое мясо', quantity: '150 грамм' },
      { category: 2, type: 'Рыба', quantity: '150 грамм' },
      { category: 2, type: 'Бобовые', quantity: '200 грамм' },
      { category: 3, type: 'Масло сливочное', quantity: '10 грамм' },
      { category: 3, type: 'Сыр', quantity: '25 грамм' },
      { category: 3, type: 'Авакадо', quantity: '1 шт' },
    ];

    newNutrition = this.nutritionRepository.create({
      userId,
      name: 'Обед',
      mealItems,
    });
    savedNutrition = await this.nutritionRepository.save(newNutrition);

    mealItems = [
      { category: 1, type: 'Фрукты/Ягоды (1 кат.)', quantity: '200 грамм' },
      { category: 1, type: 'Овощи (1 кат.)', quantity: '300 грамм' },
      { category: 1, type: 'Бобовые', quantity: '50 грамм' },
      { category: 1, type: 'Орехи', quantity: '20 грамм' },
    ];

    newNutrition = this.nutritionRepository.create({
      userId,
      name: 'Перекус',
      mealItems,
    });
    savedNutrition = await this.nutritionRepository.save(newNutrition);

    mealItems = [
      { category: 1, type: 'Овощи (1 кат.)', quantity: '300 грамм' },
      { category: 1, type: 'Бобовые', quantity: '50 грамм' },
      { category: 1, type: 'Орехи', quantity: '20 грамм' },
      { category: 2, type: 'Яйцо', quantity: '1 шт' },
      { category: 2, type: 'Творог', quantity: '50 грамм' },
      { category: 2, type: 'Кефир', quantity: '200 мл' },
      { category: 2, type: 'Орехи', quantity: '20 грамм' },
    ];

    newNutrition = this.nutritionRepository.create({
      userId,
      name: 'Ужин',
      mealItems,
    });
    savedNutrition = await this.nutritionRepository.save(newNutrition);

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
