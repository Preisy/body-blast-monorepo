import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { CreateUserByAdminRequest } from '../dto/create-admin.dto';
import { UpdateUserByAdminRequest } from '../dto/update-admin-user.dto';
import { UserRole } from '../../../../constants/constants';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseUserService } from '../../../core/user/base-user.service';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { AdminUserController } from '../admin-user.controller';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AdminUserController', () => {
  let controller: AdminUserController;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUserController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
        AdminUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(() => UserEntity),
            save: jest.fn(() => UserEntity),
            findOne: jest.fn(() => UserEntity),
            softDelete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminUserController>(AdminUserController);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers method', () => {
    it('should return an AppPaginationResponse', async () => {
      for (let i = 0; i < 5; i++) {
        const request: CreateUserByAdminRequest = {
          email: `${i}@mail.ru`,
          password: 'Qwertyuiop1',
          firstName: `Test${i}`,
          lastName: `User${i}`,
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
        await repository.save(await repository.create(request));
      }

      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

      const result = await controller.getUsers(query);

      for (const user of result.data) {
        expect(result.data).not.toBeNull();
        expect(user).toBe(UserEntity);
      }
    });
  });

  describe('getUserById method', () => {
    it('should find user record by its ID', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
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
        canWatchVideo: true,
      };
      const savedData = await repository.save(await repository.create(request));

      const user = await controller.getUserById(savedData.id);
      expect(user).toBeDefined();
      expect({ data: user.data }).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing user record', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
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
        canWatchVideo: true,
      };
      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdateUserByAdminRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
        anthrpJobPeriod: 1,
        canWatchVideo: false,
      };

      const savedUser = await controller.updateUser(savedData.id, updateRequest);
      expect(savedUser).toBeDefined();
      expect({ data: savedUser.data }).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete an user record by its ID', async () => {
      const request: CreateUserByAdminRequest = {
        email: 'e1@mail.ru',
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
        canWatchVideo: true,
      };
      const savedData = await repository.save(await repository.create(request));

      const affected = await controller.deleteUserById(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
