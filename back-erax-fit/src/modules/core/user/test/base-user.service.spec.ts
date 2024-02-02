import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRequest } from '../dto/create-user.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { UpdateUserRequest } from '../dto/update-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { Repository } from 'typeorm';

describe('BaseUserService', () => {
  let service: BaseUserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(() => UserEntity),
            save: jest.fn(() => UserEntity),
            softDelete: jest.fn(() => AppStatusResponse),
            findOne: jest.fn(() => UserEntity),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<BaseUserService>(BaseUserService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('create method', () => {
    it('should create a new user and save it', async () => {
      const request: CreateUserRequest = {
        email: '1@mail.ru',
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
      const savedUser = await service.create(request);
      await expect(savedUser).toBeDefined();
      await expect({ data: savedUser.data }).toBeDefined();
    });
  });

  describe('getUsers method', () => {
    it('should return an AppPaginationResponse', async () => {
      const query: AppPagination.Request = {
        page: 1,
        limit: 10,
      };

      for (let i = 0; i < 5; i++) {
        const request: CreateUserRequest = {
          email: `${i}@mail.ru`,
          password: 'Qwertyuiop1',
          firstName: `Test${i}`,
          lastName: `User${i}`,
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
        await repository.save(await repository.create(request));
      }
      const result = await service.getUsers(query);

      for (const user of result.data) {
        expect(result.data).not.toBeNull();
        expect(user).toBe(UserEntity);
      }
    });
  });

  describe('getUserById method', () => {
    it('should find user record by its ID', async () => {
      const request: CreateUserRequest = {
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
      const savedData = await repository.save(await repository.create(request));

      const user = await service.getUserById(savedData.id);
      expect(user).toBeDefined();
      expect({ data: user.data }).toBeDefined();
    });
  });

  describe('getUserByEmail method', () => {
    it('should find user record by its email', async () => {
      const request: CreateUserRequest = {
        email: 'test2@mail.ru',
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
      const savedData = await repository.save(await repository.create(request));

      const user = await service.getUserByEmail(savedData.email);
      expect(user).toBeDefined();
      expect({ data: user.data }).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing user record', async () => {
      const request: CreateUserRequest = {
        email: 'test3@mail.ru',
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
      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateUserRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
      };
      const savedUser = await service.updateUser(savedData.id, updateRequest);
      expect(savedUser).toBeDefined();
      expect({ data: savedUser.data }).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete an user record by its ID', async () => {
      const request: CreateUserRequest = {
        email: 'test4@mail.ru',
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
      const savedData = await repository.save(await repository.create(request));

      const affected = await service.deleteUserById(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
