import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { ClientNutritionService } from '../client-nutrition.service';
import { NutritionEntity } from '../../../../modules/core/nutrition/entity/nutrition.entity';
import { MealItemEntity } from '../../../../modules/core/nutrition/entity/meal-item.entity';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { CreateMealItemRequest } from '../../../../modules/core/nutrition/dto/create-meal-item.dto';
import { BaseNutritionService } from '../../../../modules/core/nutrition/base-nutrition.service';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { CreateNutritionRequest } from '../../../../modules/core/nutrition/dto/create-nutrition.dto';

describe('BaseNutritionService', () => {
  let service: ClientNutritionService;
  let repository: Repository<NutritionEntity>;
  let mealItemRepository: Repository<MealItemEntity>;
  let userRepository: Repository<UserEntity>;
  const mealItems: CreateMealItemRequest[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseNutritionService,
        ClientNutritionService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(() => UserEntity),
            create: jest.fn(() => UserEntity),
            findOne: jest.fn(() => UserEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(NutritionEntity),
          useValue: {
            save: jest.fn(() => NutritionEntity),
            create: jest.fn(() => NutritionEntity),
            findOne: jest.fn(() => NutritionEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(MealItemEntity),
          useValue: {
            save: jest.fn(() => MealItemEntity),
            create: jest.fn(() => MealItemEntity),
            findOne: jest.fn(() => MealItemEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<ClientNutritionService>(ClientNutritionService);
    repository = module.get<Repository<NutritionEntity>>(getRepositoryToken(NutritionEntity));
    mealItemRepository = module.get<Repository<MealItemEntity>>(getRepositoryToken(MealItemEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('findAll method', () => {
    it('it should return paginated nutrition records', async () => {
      const userRequest: CreateUserByClientRequest = {
        email: 'test1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Test',
        lastName: 'User',
        age: 33,
        weight: 80,
        weightInYouth: 70,
        height: 190,
        heartDesease: 'none',
        nutritRestrict: 'none',
        gastroDeseases: 'none',
        allergy: 'none',
        kidneyDesease: 'none',
        goals: 'Achieve volume of Arnold Schwarzenegger',
        sportsExp: 'push-ups',
        mealIntolerance: 'none',
        insulinResistance: false,
        muscleDesease: 'none',
        loadRestrictions: 'none',
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const mealItem: CreateMealItemRequest = {
        category: 1,
        quantity: '10',
        type: 'default',
      };

      await mealItemRepository.save(await mealItemRepository.create(mealItem));

      mealItems.push(mealItem);
      const request: CreateNutritionRequest = {
        userId: savedUser.id,
        name: 'breakfast',
        mealItems: mealItems,
      };

      for (let i = 0; i < 5; ++i) {
        await repository.save(await repository.create(request));
      }
      const result = await service.findAll(savedUser.id, new AppPagination.Request());

      for (const workout of result.data) {
        expect(result.data).not.toBeNull();
        expect(workout).toBe(NutritionEntity);
      }
    });
  });

  describe('findAll method', () => {
    it('it should return paginated nutrition records', async () => {
      const userRequest: CreateUserByClientRequest = {
        email: 'test1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Test',
        lastName: 'User',
        age: 33,
        weight: 80,
        weightInYouth: 70,
        height: 190,
        heartDesease: 'none',
        nutritRestrict: 'none',
        gastroDeseases: 'none',
        allergy: 'none',
        kidneyDesease: 'none',
        goals: 'Achieve volume of Arnold Schwarzenegger',
        sportsExp: 'push-ups',
        mealIntolerance: 'none',
        insulinResistance: false,
        muscleDesease: 'none',
        loadRestrictions: 'none',
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const mealItem: CreateMealItemRequest = {
        category: 1,
        quantity: '10',
        type: 'default',
      };

      await mealItemRepository.save(await mealItemRepository.create(mealItem));

      mealItems.push(mealItem);
      const request: CreateNutritionRequest = {
        userId: savedUser.id,
        name: 'breakfast',
        mealItems: mealItems,
      };

      for (let i = 0; i < 5; ++i) {
        await repository.save(await repository.create(request));
      }

      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };
      const result = await service.findAll(savedUser.id, query);

      for (const workout of result.data) {
        expect(result.data).not.toBeNull();
        expect(workout).toBe(NutritionEntity);
      }
    });
  });
});
