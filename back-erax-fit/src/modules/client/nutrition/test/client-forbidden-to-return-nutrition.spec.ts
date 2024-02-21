import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { ClientNutritionService } from '../client-nutrition.service';
import { NutritionEntity } from '../../../core/nutrition/entity/nutrition.entity';
import { MealItemEntity } from '../../../core/nutrition/entity/meal-item.entity';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { CreateMealItemRequest } from '../../../core/nutrition/dto/create-meal-item.dto';
import { BaseNutritionService } from '../../../core/nutrition/base-nutrition.service';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { CreateNutritionRequest } from '../../../core/nutrition/dto/create-nutrition.dto';
import { ClientNutritionController } from '../client-nutrition.controller';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '../../../../modules/authentication/types/requestWithUser.type';

describe('ClientNutritionController', () => {
  let controller: ClientNutritionController;
  let repository: Repository<NutritionEntity>;
  let mealItemRepository: Repository<MealItemEntity>;
  let userRepository: Repository<UserEntity>;
  const mealItems: CreateMealItemRequest[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientNutritionController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
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
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ClientNutritionController>(ClientNutritionController);
    repository = module.get<Repository<NutritionEntity>>(getRepositoryToken(NutritionEntity));
    mealItemRepository = module.get<Repository<MealItemEntity>>(getRepositoryToken(MealItemEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('getAll method', () => {
    it('it should not return paginated nutrition records because this action is forbidden', async () => {
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

      const requestWithUser = {} as RequestWithUser;
      await expect(controller.getAll(requestWithUser, new AppPagination.Request())).rejects.toThrow();
    });
  });
});
