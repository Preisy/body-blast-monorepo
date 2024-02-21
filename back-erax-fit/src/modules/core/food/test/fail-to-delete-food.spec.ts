import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../entity/food.entity';
import { BaseFoodService } from '../base-food.service';
import { CreateFoodRequest } from '../dto/create-food.dto';
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

  describe('delete method', () => {
    it('it should not delete one food record because of wrong id', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 2,
        name: 'papa mozhet',
      };

      const savedData = await repository.save(await repository.create(request));

      await expect(service.deleteOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
