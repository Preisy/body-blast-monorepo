import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { BaseUserService } from '../../user/base-user.service';
import { FoodEntity } from '../entity/food.entity';
import { BaseFoodService } from '../base-food.service';
import { CreateFoodRequest } from '../dto/create-food.dto';
import { UpdateFoodRequest } from '../dto/update-food.dto';
import { UserEntity } from '../../user/entities/user.entity';

describe('BaseFoodService', () => {
  let service: BaseFoodService;
  let repository: Repository<FoodEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        BaseFoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useValue: {
            save: jest.fn(() => FoodEntity),
            create: jest.fn(() => FoodEntity),
            findOne: jest.fn(() => FoodEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseFoodService>(BaseFoodService);
    repository = module.get<Repository<FoodEntity>>(getRepositoryToken(FoodEntity));
  });

  describe('create method', () => {
    it('should create a new food record and save it', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedFood = await service.create(request);

      expect(savedFood).toBeDefined();
      expect(savedFood.data).toBeDefined();
    });
  });

  describe('findAll method', () => {
    it('it should return paginated food records', async () => {
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

      const request: CreateFoodRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };
      for (let i = 0; i < 4; i++) {
        await repository.save(await repository.create(request));
      }

      const result = await service.findAll(query);

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(FoodEntity);
      }
    });
  });

  describe('findOne method', () => {
    it('should find a food record by its ID', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedData = await repository.save(await repository.create(request));

      const food = await service.findOne(savedData.id);
      expect(food).toBeDefined();
      expect(food.data).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing workout record', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateFoodRequest = {
        name: 'VKUS OCHKA',
      };

      const updatedFood = await service.update(savedData.id, updateRequest);
      expect(updatedFood).toBeDefined();
      expect(updatedFood.data).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete a workout record by its ID', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedData = await repository.save(await repository.create(request));

      const affected = await service.deleteOne(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
