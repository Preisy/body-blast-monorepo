import { Test, TestingModule } from '@nestjs/testing';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
//import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserService } from '../../../core/user/base-user.service';
import { UserRole } from '../../../../constants/constants';
import { CreateAnthropometricsByAdminRequest } from '../dto/create-anthropometrics-by-admin.dto';
import { AdminUserService } from '../../user/admin-user.service';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { CreateUserByAdminRequest } from '../../user/dto/create-admin.dto';

describe('AdminAnthropometricsService', () => {
  let service: AdminAnthropometricsService;
  let repository: Repository<AnthropometricsEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        AdminUserService,
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
        BaseAnthropometrcisService,
        AdminAnthropometricsService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useValue: {
            save: jest.fn(() => AnthropometricsEntity),
            create: jest.fn(() => AnthropometricsEntity),
            findOne: jest.fn(() => AnthropometricsEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminAnthropometricsService>(AdminAnthropometricsService);
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should create a new anthropometrics record', async () => {
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
        role: UserRole.Client,
        canWatchVideo: false,
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const request: CreateAnthropometricsByAdminRequest = {
        weight: 67,
        waist: 33,
        abdomen: 71,
        shoulder: 92,
        hip: 30,
        hipVolume: 30,
        userId: savedUser.id,
      };
      const savedAnthropometrics = await service.create(request);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  // describe('findAll method', () => {
  //   it('it should return antropometrics records without between given period', async () => {
  //     const query: AppDatePagination.Request = {
  //       from: new Date('2023-31-10'),
  //       to: new Date('2023-31-11'),
  //     };

  //     const result = await service.findAll(query);

  //     expect(result).toBeInstanceOf(AppDatePagination.Response);
  //     expect(result.data).toBeInstanceOf(AppDatePagination.Response<AnthropometricsEntity>);
  //   });
  // });

  describe('findOne method', () => {
    it('should find an anthropometrics record by its ID', async () => {
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
        role: UserRole.Client,
        canWatchVideo: false,
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const request: CreateAnthropometricsByAdminRequest = {
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

  describe('createAnthropometricsCron method', () => {
    it('should create anthropometrics records based on the cron schedule', async () => {
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
        role: UserRole.Client,
        canWatchVideo: false,
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const latestAnthropometrics = [{ userId: savedUser.id, createdAt: new Date() }] as AnthropometricsEntity[];
      service.findLatestAnthropometricsForEachUser = jest.fn().mockResolvedValue(latestAnthropometrics);

      await service.createAnthropometricsCron();

      expect(userRepository.save).toHaveBeenCalledWith({ userId: savedUser.id });
    });
  });
});
