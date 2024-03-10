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
import { AdminFoodController } from '../admin-food.controller';
import { FoodEntity } from '../../../../modules/core/food/entity/food.entity';
import { BaseFoodService } from '../../../../modules/core/food/base-food.service';
import { AdminFoodService } from '../admin-food.service';
import { CreateFoodByAdminRequest } from '../dto/admin-create-food.dto';
import { UpdateFoodByAdminRequest } from '../dto/admin-update-food.dto';

describe('AdminFoodController', () => {
  let controller: AdminFoodController;
  let repository: Repository<FoodEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminFoodController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
        BaseFoodService,
        AdminFoodService,
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

    controller = module.get<AdminFoodController>(AdminFoodController);
    repository = module.get<Repository<FoodEntity>>(getRepositoryToken(FoodEntity));
  });

  describe('create method', () => {
    it('should create a new food record and save it', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedFood = await controller.create(request);

      expect(savedFood).toBeDefined();
      expect(savedFood.data).toBeDefined();
    });
  });

  describe('getAll method', () => {
    it('it should return paginated food records', async () => {
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };
      for (let i = 0; i < 4; i++) {
        await repository.save(await repository.create(request));
      }

      const result = await controller.getAll(query);

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(FoodEntity);
      }
    });
  });

  describe('getOne method', () => {
    it('should find a food record by its ID', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedData = await repository.save(await repository.create(request));

      const food = await controller.getOne(savedData.id);
      expect(food).toBeDefined();
      expect(food.data).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing workout record', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateFoodByAdminRequest = {
        name: 'VKUS OCHKA',
      };

      const updatedFood = await controller.update(savedData.id, updateRequest);
      expect(updatedFood).toBeDefined();
      expect(updatedFood.data).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete a workout record by its ID', async () => {
      const request: CreateFoodByAdminRequest = {
        type: 'meat',
        category: 1,
        name: 'PAPA MOZHET',
      };

      const savedData = await repository.save(await repository.create(request));

      const affected = await controller.deleteOne(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
