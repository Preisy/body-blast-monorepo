import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../entity/food.entity';
import { BaseFoodService } from '../base-food.service';
import { AppPagination } from '../../../../utils/app-pagination.util';
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
            findAndCount: jest.fn(() => [[], 0]),
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

  describe('findAll method', () => {
    it('it should return all paginated food records', async () => {
      const request: CreateFoodRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };
      for (let i = 0; i < 4; i++) {
        await repository.save(await repository.create(request));
      }

      const result = await service.findAll(new AppPagination.Request());

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(FoodEntity);
      }
    });
  });
});
