import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnthropometricsByClientRequest } from '../dto/client-create-anthropometrics.dto';
import { MeService } from '../../me/me.service';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { ClientAnthropometricsController } from '../client-anthropometrics.controller';
import { RequestWithUser } from '../../../../modules/authentication/types/requestWithUser.type';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';

describe('ClientAnthropometricsService/Controller', () => {
  let service: ClientAnthropometricsService;
  let userRepository: Repository<UserEntity>;
  let controller: ClientAnthropometricsController;

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
          useClass: Repository,
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
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not create new anthrp record because of wrong data', async () => {
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

      const invalidAnthrpRequest: CreateAnthropometricsByClientRequest = {
        userId: savedUser.id,
        waist: 100,
        weight: -100,
        shoulder: 100,
        hip: 20,
        hipVolume: 100,
        abdomen: 100,
      };

      const requestWithUser = {} as RequestWithUser;
      await expect(controller.create(requestWithUser, invalidAnthrpRequest)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should not create new anthrp record because of wrong data', async () => {
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

      const invalidAnthrpRequest: CreateAnthropometricsByClientRequest = {
        userId: savedUser.id,
        waist: 100,
        weight: -100,
        shoulder: 100,
        hip: 20,
        hipVolume: 100,
        abdomen: 100,
      };

      await expect(service.create(savedUser, invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
