import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { CreateAnthropometricsByClientRequest } from '../dto/client-create-anthropometrics.dto';
import { UpdateAnthropometricsByClientRequest } from '../dto/client-update-anthropometrics.dto';
// import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { MeService } from '../../me/me.service';
import { BaseAnthropometrcisService } from '../../../../modules/core/anthropometrics/base-anthropometrics.service';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';

describe('ClientAnthropometricsService', () => {
  let service: ClientAnthropometricsService;
  let repository: Repository<AnthropometricsEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        MeService,
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
        ClientAnthropometricsService,
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

    service = module.get<ClientAnthropometricsService>(ClientAnthropometricsService);
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('create method', () => {
    it('should create a new anthropometrics record and save it', async () => {
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

      const request: CreateAnthropometricsByClientRequest = {
        weight: 90,
        waist: 40,
        abdomen: 88,
        shoulder: 101,
        hip: 56,
        hipVolume: 56,
        userId: savedUser.id,
      };
      const savedAnthropometrics = await service.create(savedUser, request);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  // describe('findAll method', () => {
  //   it('it should return all antropometrics records between given period', async () => {
  //     const { data: user } = await userService.getMe(3);
  //     const query: AppDatePagination.Request = {
  //       from: new Date('2023-18-10'),
  //       to: new Date('2023-20-11'),
  //     };

  //     const result = await service.findAll(user, query);

  //     expect(result).toBeInstanceOf(AppDatePagination.Response);
  //     expect(result.data).toBeInstanceOf(AppDatePagination.Response<AnthropometricsEntity>);
  //   });
  // });

  describe('findOne method', () => {
    it('should find an anthropometrics record by its ID', async () => {
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

      const request: CreateAnthropometricsByClientRequest = {
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

      const request: CreateAnthropometricsByClientRequest = {
        userId: savedUser.id,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateAnthropometricsByClientRequest = {
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

      const request: CreateAnthropometricsByClientRequest = {
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
