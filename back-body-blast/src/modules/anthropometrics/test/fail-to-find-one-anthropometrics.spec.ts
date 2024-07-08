import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsService } from '../anthropometrics.service';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  describe('findOne method', () => {
    it("shouldn't find anthropometrics record because of incorrect id and should throw 404", async () => {
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
      await expect(service.findOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
