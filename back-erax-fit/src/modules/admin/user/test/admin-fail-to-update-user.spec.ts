import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { UpdateUserByAdminRequest } from '../dto/update-admin-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { BaseUserService } from '../../../core/user/base-user.service';
import { UserRole } from '../../../../constants/constants';
import { CreateUserByAdminRequest } from '../dto/create-admin.dto';

describe('AdminUserService', () => {
  let service: AdminUserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        AdminUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(() => UserEntity),
            save: jest.fn(() => UserEntity),
          },
        },
      ],
    }).compile();

    service = module.get<AdminUserService>(AdminUserService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateUser method', () => {
    it('should not update an existing user record because of wrong id', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.Client,
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
        canWatchVideo: false,
      };
      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateUserByAdminRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
        canWatchVideo: true,
        anthrpJobPeriod: 1,
      };
      expect(service.updateUser(savedData.id + 5, updateRequest)).rejects.toThrow();
    });
  });

  describe('updateUser method', () => {
    it('should not update an existing user record because of numeric fields', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.Client,
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
        canWatchVideo: false,
      };
      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateUserByAdminRequest = {
        height: -1,
        weight: 100,
        weightInYouth: -1,
        heartDesease: 'heart shortage',
        canWatchVideo: true,
        anthrpJobPeriod: 1,
      };
      expect(service.updateUser(savedData.id, updateRequest)).rejects.toThrow();
    });
  });
});
