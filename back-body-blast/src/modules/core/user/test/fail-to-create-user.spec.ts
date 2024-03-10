import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';
import { CreateUserRequest } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

describe('BaseUserService', () => {
  let service: BaseUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseUserService>(BaseUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should not create a new user because of wrong password', async () => {
      const request: CreateUserRequest = {
        email: 'test@mail.ru',
        password: 'qwertyuiop',
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
      expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new user because of empty string fields', async () => {
      const request: CreateUserRequest = {
        email: 'test1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Aaa',
        lastName: 'Aaa',
        age: 33,
        weight: 80,
        weightInYouth: 70,
        height: 190,
        heartDesease: '',
        nutritRestrict: '',
        gastroDeseases: '',
        allergy: '',
        kidneyDesease: '',
        goals: '',
        sportsExp: '',
        mealIntolerance: '',
        insulinResistance: false,
        muscleDesease: '',
        loadRestrictions: '',
      };
      expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new user because of wrong email', async () => {
      const request: CreateUserRequest = {
        email: 'dfghjklkjhgfds',
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
      expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new user because of wromg numeric fields', async () => {
      const request: CreateUserRequest = {
        email: 'e1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: '',
        lastName: '',
        age: -1,
        weight: -1,
        weightInYouth: -1,
        height: -1,
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
      expect(service.create(request)).rejects.toThrow();
    });
  });
});
