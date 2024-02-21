import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../../../../modules/core/food/entity/food.entity';
import { BaseFoodService } from '../../../../modules/core/food/base-food.service';
import { AdminFoodService } from '../admin-food.service';
import { CreateFoodByAdminRequest } from '../dto/admin-create-food.dto';
import { UpdateFoodByAdminRequest } from '../dto/admin-update-food.dto';

describe('AdminFoodService', () => {
  let service: AdminFoodService;
  let repository: Repository<FoodEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseFoodService,
        AdminFoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useValue: {
            save: jest.fn(() => FoodEntity),
            create: jest.fn(() => FoodEntity),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<FoodEntity>>(getRepositoryToken(FoodEntity));
    service = module.get<AdminFoodService>(AdminFoodService);
  });

  describe('update method', () => {
    it('it should not update existing food record because of wrong id', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));
      const updateRequest: UpdateFoodByAdminRequest = {
        name: 'dinner',
      };

      await expect(service.update(savedData.id + 5, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('it should not update existing food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));
      const updateRequest: UpdateFoodByAdminRequest = {
        name: '',
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('it should not update existing food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));
      const updateRequest: UpdateFoodByAdminRequest = {
        name: 'dinner',
        category: 10,
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });
});
