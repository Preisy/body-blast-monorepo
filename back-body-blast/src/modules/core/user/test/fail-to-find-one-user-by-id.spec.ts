import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../dto/create-user.dto';

describe('BaseUserService', () => {
  let service: BaseUserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
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

    service = module.get<BaseUserService>(BaseUserService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById method', () => {
    it('should not find user record because of wrong id', async () => {
      const request: CreateUserRequest = {
        email: 'test2@mail.ru',
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

      expect(service.getUserById(savedData.id + 5)).resolves.toBeNull;
    });
  });
});
