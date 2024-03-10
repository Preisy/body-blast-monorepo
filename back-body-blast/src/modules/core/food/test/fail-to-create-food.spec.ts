import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../entity/food.entity';
import { BaseFoodService } from '../base-food.service';
import { CreateFoodRequest } from '../dto/create-food.dto';
import { UserEntity } from '../../user/entities/user.entity';

describe('BaseFoodService', () => {
  let service: BaseFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseFoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseFoodService>(BaseFoodService);
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: '',
        category: 0,
        name: '',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: 'default',
        category: 0,
        name: 'default',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: '',
        category: 1,
        name: 'default',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: 'default',
        category: 1,
        name: '',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('it should not create a new food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 10,
        name: 'papa mozhet',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });
});
