import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAnthropometricsByClientRequest } from '../dto/client-update-anthropometrics.dto';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { MeService } from '../../me/me.service';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { CreateAnthropometricsByClientRequest } from '../dto/client-create-anthropometrics.dto';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { ClientAnthropometricsController } from '../client-anthropometrics.controller';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('ClientAnthropometricsService/Controller', () => {
  let service: ClientAnthropometricsService;
  let userRepository: Repository<UserEntity>;
  let controller: ClientAnthropometricsController;
  let repository: Repository<AnthropometricsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientAnthropometricsController],
      providers: [
        BaseUserService,
        MeService,
        AuthService,
        JwtService,
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
          },
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClientAnthropometricsService>(ClientAnthropometricsService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    controller = module.get<ClientAnthropometricsController>(ClientAnthropometricsController);
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should not update existing anthrp record because of wrong data', async () => {
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

      const invalidAnthrpRequest: UpdateAnthropometricsByClientRequest = {
        waist: 100,
        weight: -100,
        shoulder: 100,
        hip: 20,
        hipVolume: 100,
        abdomen: 100,
      };
      await expect(service.update(savedData.id, invalidAnthrpRequest)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should not update existing anthrp record because of wrong data', async () => {
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

      const invalidAnthrpRequest: UpdateAnthropometricsByClientRequest = {
        waist: 100,
        weight: -100,
        shoulder: 100,
        hip: 20,
        hipVolume: 100,
        abdomen: 100,
      };
      await expect(controller.update(savedData.id, invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
