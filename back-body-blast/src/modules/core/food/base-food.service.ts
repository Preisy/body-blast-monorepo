import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { CreateFoodRequest } from './dto/create-food.dto';
import { FoodEntity } from './entity/food.entity';
import { UpdateFoodRequest } from './dto/update-food.dto';

@Injectable()
export class BaseFoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
  ) {}

  async create(request: CreateFoodRequest): Promise<AppSingleResponse<FoodEntity>> {
    const newFood = this.foodRepository.create({
      ...request,
    });
    const savedFood = await this.foodRepository.save(newFood);
    return new AppSingleResponse(savedFood);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<FoodEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.foodRepository);
    return getPaginatedData(query);
  }

  async findOne(id: FoodEntity['id']) {
    const food = await this.foodRepository.findOne({
      where: { id },
    });

    if (!food) throw MainException.entityNotFound(`Food with id: ${id} not found`);
    return new AppSingleResponse(food);
  }

  async update(id: FoodEntity['id'], request: UpdateFoodRequest) {
    const { data: food } = await this.findOne(id);
    const savedFood = await this.foodRepository.save({
      ...food,
      ...filterUndefined(request),
    });
    return new AppSingleResponse(savedFood);
  }

  async deleteOne(id: FoodEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.foodRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  async deleteType(type: FoodEntity['type']): Promise<AppStatusResponse> {
    const { affected } = await this.foodRepository
      .createQueryBuilder('food')
      .delete()
      .from(FoodEntity)
      .where('food.type = :type', { type: `${type}` })
      .execute();
    return new AppStatusResponse(!!affected);
  }
}
