import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { AdminNutritionController } from '../admin-nutrition.controller';
import { MealItemEntity } from '../../../../modules/core/nutrition/entity/meal-item.entity';
import { NutritionEntity } from '../../../../modules/core/nutrition/entity/nutrition.entity';
import { CreateMealItemRequest } from '../../../../modules/core/nutrition/dto/create-meal-item.dto';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { BaseNutritionService } from '../../../../modules/core/nutrition/base-nutrition.service';
import { AdminNutritionService } from '../admin-nutrition.service';
import { CreateUserByAdminRequest } from '../../user/dto/create-admin.dto';
import { UserRole } from '../../../../constants/constants';
import { CreateNutritionByAdminRequest } from '../dto/admin-create-nutrition.dto';
import { UpdateNutritionByAdminRequest } from '../dto/admin-update-nutrition.dto';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';

describe('AdminNutritionController', () => {
  let controller: AdminNutritionController;
  let repository: Repository<NutritionEntity>;
  let mealItemRepository: Repository<MealItemEntity>;
  let userRepository: Repository<UserEntity>;
  const mealItems: CreateMealItemRequest[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminNutritionController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
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

    controller = module.get<AdminNutritionController>(AdminNutritionController);
    repository = module.get<Repository<NutritionEntity>>(getRepositoryToken(NutritionEntity));
    mealItemRepository = module.get<Repository<MealItemEntity>>(getRepositoryToken(MealItemEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('create method', () => {
    it('should create a new nutrition record and save it', async () => {
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

      const savedNutrition = await controller.create(request);

      expect(savedNutrition).toBeDefined();
      expect(savedNutrition.data).toBeDefined();
    });
  });

  describe('getAll method', () => {
    it('it should return paginated nutrition records', async () => {
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

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

      for (let i = 0; i < 5; ++i) {
        await repository.save(await repository.create(request));
      }
      const result = await controller.getAll(query);

      for (const workout of result.data) {
        expect(result.data).not.toBeNull();
        expect(workout).toBe(NutritionEntity);
      }
    });
  });

  describe('getOne method', () => {
    it('should find a nutrition record by its ID', async () => {
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

      const nutrition = await controller.getOne(savedData.id);
      expect(nutrition).toBeDefined();
      expect(nutrition.data).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing workout record', async () => {
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
      const updateRequest: UpdateNutritionByAdminRequest = {
        name: 'dinner',
      };

      const savedNutrition = await controller.update(savedData.id, updateRequest);
      expect(savedNutrition).toBeDefined();
      expect(savedNutrition.data).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete a workout record by its ID', async () => {
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

      const affected = await controller.deleteOne(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
