import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { FoodEntity } from '../../../../modules/core/food/entity/food.entity';
import { BaseFoodService } from '../../../../modules/core/food/base-food.service';
import { ClientFoodService } from '../client-food.service';
import { CreateFoodRequest } from '../../../../modules/core/food/dto/create-food.dto';

describe('AdminFoodController', () => {
  let service: ClientFoodService;
  let repository: Repository<FoodEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
        BaseFoodService,
        ClientFoodService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
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
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClientFoodService>(ClientFoodService);
    repository = module.get<Repository<FoodEntity>>(getRepositoryToken(FoodEntity));
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
});
