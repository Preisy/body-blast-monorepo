import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsService } from '../anthropometrics.service';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';
import { UpdateAnthropometricsRequest } from '../dto/update-anthropometrics';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UserEntity } from '../../core/user/entities/user.entity';
import { BaseUserService } from '../../core/user/base-user.service';
import { CreateUserRequest } from '../../core/user/dto/create-user.dto';

describe('BaseAnthropometricsService', () => {
  let service: AnthropometricsService;
  let repository: Repository<AnthropometricsEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(() => UserEntity),
            create: jest.fn(() => UserEntity),
            findOne: jest.fn(() => UserEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(),
          },
        },
        AnthropometricsService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useValue: {
            save: jest.fn(() => AnthropometricsEntity),
            create: jest.fn(() => AnthropometricsEntity),
            findOne: jest.fn(() => AnthropometricsEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<AnthropometricsService>(AnthropometricsService);
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('create method', () => {
    it('should create a new anthropometrics record and save it', async () => {
      const userRequest: CreateUserRequest = {
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

      const request: CreateAnthropometricsRequest = {
        weight: 67,
        waist: 33,
        abdomen: 71,
        shoulder: 92,
        hip: 30,
        hipVolume: 30,
        userId: savedUser.id,
      };
      const savedAnthropometrics = await service.createEmptyAnthrpRecordForUser(request);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  describe('findAll method', () => {
    it('it should return all antropometrics records between given period', async () => {
      const query: AppDatePagination.Request = {
        from: new Date('2023-18-10'),
        to: new Date('2023-20-11'),
      };

      const userRequest: CreateUserRequest = {
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

      const request: CreateAnthropometricsRequest = {
        weight: 90,
        waist: 40,
        abdomen: 88,
        shoulder: 101,
        hip: 56,
        hipVolume: 56,
        userId: savedUser.id,
      };
      for (let i = 0; i < 5; ++i) {
        await repository.save(await repository.create(request));
      }
      const result = await service.findAll(query);

      for (const anthrp of result.data) {
        expect(anthrp.createdAt).toBeGreaterThanOrEqual(Date.now() - 1000000);
        expect(anthrp.createdAt).toBeLessThanOrEqual(Date.now() + 1000000);
      }
    });
  });

  describe('findOne method', () => {
    it('should find an anthropometrics record by its ID', async () => {
      const userRequest: CreateUserRequest = {
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

      const request: CreateAnthropometricsRequest = {
        userId: savedUser.id,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };

      const savedData = await repository.save(await repository.create(request));

      const anthropometrics = await service.findOne(savedData.id);
      expect(anthropometrics).toBeDefined();
      expect({ data: anthropometrics.data }).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing anthropometrics record', async () => {
      const userRequest: CreateUserRequest = {
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

      const request: CreateAnthropometricsRequest = {
        userId: savedUser.id,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateAnthropometricsRequest = {
        weight: 57,
        waist: 30,
        abdomen: 78,
        shoulder: 99,
        hip: 39,
        hipVolume: 33,
      };
      const savedAnthropometrics = await service.update(savedData.id, updateRequest);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete an anthropometrics record by its ID', async () => {
      const userRequest: CreateUserRequest = {
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

      const request: CreateAnthropometricsRequest = {
        userId: savedUser.id,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };

      const savedData = await repository.save(await repository.create(request));

      const affected = await service.delete(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
