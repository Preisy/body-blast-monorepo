import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { NutritionEntity } from '../../../../modules/core/nutrition/entity/nutrition.entity';
import { MealItemEntity } from '../../../../modules/core/nutrition/entity/meal-item.entity';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { CreateMealItemRequest } from '../../../../modules/core/nutrition/dto/create-meal-item.dto';
import { BaseNutritionService } from '../../../../modules/core/nutrition/base-nutrition.service';
import { CreateUserByAdminRequest } from '../../user/dto/create-admin.dto';
import { AdminNutritionService } from '../admin-nutrition.service';
import { UserRole } from '../../../../constants/constants';
import { CreateNutritionByAdminRequest } from '../dto/admin-create-nutrition.dto';

describe('AdminNutritionService', () => {
  let service: AdminNutritionService;
  let repository: Repository<NutritionEntity>;
  let mealItemRepository: Repository<MealItemEntity>;
  let userRepository: Repository<UserEntity>;
  const mealItems: CreateMealItemRequest[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseNutritionService,
        AdminNutritionService,
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

    service = module.get<AdminNutritionService>(AdminNutritionService);
    repository = module.get<Repository<NutritionEntity>>(getRepositoryToken(NutritionEntity));
    mealItemRepository = module.get<Repository<MealItemEntity>>(getRepositoryToken(MealItemEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('findOne method', () => {
    it('it should not return one nutrition record because of wrong id', async () => {
      const userRequest: CreateUserByAdminRequest = {
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
        canWatchVideo: false,
        role: UserRole.Client,
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const mealItem: CreateMealItemRequest = {
        category: 1,
        quantity: '10',
        type: 'default',
      };

      await mealItemRepository.save(await mealItemRepository.create(mealItem));

      mealItems.push(mealItem);
      const request: CreateNutritionByAdminRequest = {
        userId: savedUser.id,
        name: 'breakfast',
        mealItems: mealItems,
      };

      const savedData = await repository.save(await repository.create(request));

      expect(service.findOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
