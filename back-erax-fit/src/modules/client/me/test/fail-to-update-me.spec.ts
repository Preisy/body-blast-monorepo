import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from '../me.service';
import { UpdateUserByClientRequest } from '../dto/update-client-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
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

  describe('updateUser method', () => {
    it('should not update an existing user record because of wrong id', async () => {
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

      const updateRequest: UpdateUserByClientRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
      };
      expect(service.updateUser(savedData.id + 5, updateRequest)).rejects.toThrow();
    });
  });

  describe('updateUser method', () => {
    it('should not update an existing user record because of numeric fields', async () => {
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

      const updateRequest: UpdateUserByClientRequest = {
        height: -1,
        weight: 100,
        weightInYouth: -1,
        heartDesease: 'heart shortage',
      };
      expect(service.updateUser(savedData.id, updateRequest)).rejects.toThrow();
    });
  });
});
