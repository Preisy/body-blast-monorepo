import { Test, TestingModule } from '@nestjs/testing';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
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
import { GetAnthropometricsForUserByAdminRequest } from '../dto/get-anthropometrics-for-user-by-admin.dto';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminAnthropometricsController } from '../admin-anthropometrics.controller';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';

describe('AdminAnthropometricsController', () => {
  let service: AdminAnthropometricsService;
  let controller: AdminAnthropometricsController;
  let repository: Repository<AnthropometricsEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAnthropometricsController],
      providers: [
        AuthService,
        JwtService,
        BaseUserService,
        AdminUserService,
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
        BaseAnthropometrcisService,
        AdminAnthropometricsService,
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
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminAnthropometricsService>(AdminAnthropometricsService);
    controller = module.get<AdminAnthropometricsController>(AdminAnthropometricsController);
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
      const savedAnthropometrics = await controller.create(request);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  describe('getAll method', () => {
    it('it should return antropometrics records without between given period', async () => {
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

      const query: GetAnthropometricsForUserByAdminRequest = {
        from: new Date('2023-18-10'),
        to: new Date('2023-20-11'),
        id: savedUser.id,
      };

      const result = await controller.getAll(query);

      for (const anthrp of result.data) {
        expect(anthrp.createdAt).toBeGreaterThanOrEqual(Date.now() - 1000000);
        expect(anthrp.createdAt).toBeLessThanOrEqual(Date.now() + 1000000);
      }
    });
  });

  describe('getOne method', () => {
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

      const anthropometrics = await controller.getOne(savedData.id);
      expect(anthropometrics).toBeDefined();
      expect({ data: anthropometrics.data }).toBeDefined();
    });
  });
});
