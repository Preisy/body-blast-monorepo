import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from '../me.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { BaseUserService } from '../../../core/user/base-user.service';
import { CreateUserByClientRequest } from '../dto/create-client-user.dto';

describe('MeService', () => {
  let service: MeService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        MeService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(() => UserEntity),
            save: jest.fn(() => UserEntity),
            findOne: jest.fn(() => UserEntity),
          },
        },
      ],
    }).compile();

    service = module.get<MeService>(MeService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMe method', () => {
    it('should find user record by its ID', async () => {
      const request: CreateUserByClientRequest = {
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

      expect(savedData).toBeDefined();
      expect({ data: savedData }).toBeDefined();
    });
  });
});
