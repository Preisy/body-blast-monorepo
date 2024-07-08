import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsService } from '../anthropometrics.service';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { Repository } from 'typeorm';
import { UpdateAnthropometricsRequest } from '../dto/update-anthropometrics';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { BaseUserService } from '../../core/user/base-user.service';
import { CreateUserRequest } from '../../core/user/dto/create-user.dto';

describe('BaseAnthropometricsService', () => {
  let service: AnthropometricsService;
  let userRepository: Repository<UserEntity>;
  let repository: Repository<AnthropometricsEntity>;

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
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useValue: {
            save: jest.fn(() => AnthropometricsEntity),
            create: jest.fn(() => AnthropometricsEntity),
          },
        },
        AnthropometricsService,
      ],
    }).compile();

    service = module.get<AnthropometricsService>(AnthropometricsService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should not update existing anthrp record because of wrong data', async () => {
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
      const invalidAnthrpRequest: UpdateAnthropometricsRequest = {
        waist: 9,
        weight: -2,
        shoulder: 9999,
        hip: 30,
        hipVolume: 31,
        abdomen: 30,
      };

      await expect(service.update(savedData.id, invalidAnthrpRequest)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should not update existing anthrp record because given id not found', async () => {
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

      const invalidAnthrpRequest: UpdateAnthropometricsRequest = {
        waist: 90,
        weight: 90,
        shoulder: 90,
        hip: 90,
        hipVolume: 90,
        abdomen: 90,
      };

      await expect(service.update(savedData.id + 5, invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
