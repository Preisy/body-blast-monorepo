import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { AnthropometricsService } from '../anthropometrics.service';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseUserService } from '../../core/user/base-user.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../../core/user/dto/create-user.dto';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';

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
            findOne: jest.fn(() => AnthropometricsEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
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

  describe('findAll method', () => {
    it('it should return all antropometrics records without any input data', async () => {
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
      const result = await service.findAll(new AppDatePagination.Request());

      for (const anthrp of result.data) {
        expect(anthrp.createdAt).toBeGreaterThanOrEqual(Date.now() - 1000000);
        expect(anthrp.createdAt).toBeLessThanOrEqual(Date.now() + 1000000);
      }
    });
  });
});
