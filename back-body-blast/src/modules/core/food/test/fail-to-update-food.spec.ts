import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        BaseFoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useValue: {
            save: jest.fn(() => FoodEntity),
            create: jest.fn(() => FoodEntity),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<Repository<FoodEntity>>(getRepositoryToken(FoodEntity));
    service = module.get<BaseFoodService>(BaseFoodService);
  });

  describe('update method', () => {
    it('it should not update existing food record because of wrong id', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));
      const updateRequest: UpdateFoodRequest = {
        name: 'dinner',
      };

      await expect(service.update(savedData.id + 5, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('it should not update existing food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));
      const updateRequest: UpdateFoodRequest = {
        name: '',
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('it should not update existing food record because of wrong data', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));
      const updateRequest: UpdateFoodRequest = {
        name: 'dinner',
        category: 10,
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });
});
