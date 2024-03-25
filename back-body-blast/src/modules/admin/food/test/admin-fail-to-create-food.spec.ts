import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../../../../modules/core/food/entity/food.entity';
import { BaseFoodService } from '../../../../modules/core/food/base-food.service';
import { AdminFoodService } from '../admin-food.service';
import { CreateFoodByAdminRequest } from '../dto/admin-create-food.dto';

describe('AdminFoodController', () => {
  let service: AdminFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseFoodService,
        AdminFoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminFoodService>(AdminFoodService);
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: '',
        category: 0,
        name: '',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'default',
        category: 0,
        name: 'default',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: '',
        category: 1,
        name: 'default',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'default',
        category: 1,
        name: '',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 10,
        name: 'papa mozhet',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });
});
