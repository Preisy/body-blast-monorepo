import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { CreateUserByAdminRequest } from '../dto/create-admin.dto';
import { UserRole } from '../../../../constants/constants';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseUserService } from '../../../core/user/base-user.service';

describe('AdminUserService', () => {
  let service: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        BaseUserService,
      ],
    }).compile();
    service = module.get<AdminUserService>(AdminUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should not create a new user because of wrong password', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
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
        role: UserRole.Client,
        canWatchVideo: true,
      };
      expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new user because of empty FIO', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: '',
        lastName: '',
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
        role: UserRole.Client,
        canWatchVideo: false,
      };
      expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new user because of wrong email', async () => {
      const request: CreateUserByAdminRequest = {
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
        role: UserRole.Client,
        canWatchVideo: false,
      };
      expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new user because of wromg numeric fields', async () => {
      const request: CreateUserByAdminRequest = {
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
        role: UserRole.Client,
        canWatchVideo: false,
      };
      expect(service.create(request)).rejects.toThrow();
    });
  });
});
