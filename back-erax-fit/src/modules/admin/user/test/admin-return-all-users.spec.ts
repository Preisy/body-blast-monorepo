import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserService } from '../../../core/user/base-user.service';
import { CreateUserByAdminRequest } from '../dto/create-admin.dto';
import { UserRole } from '../../../../constants/constants';

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
            save: jest.fn(() => UserEntity),
            create: jest.fn(() => UserEntity),
            findAndCount: jest.fn(() => Promise<[UserEntity[], number]>),
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
      const result = await service.getUsers(new AppPagination.Request());

      for (const user of result.data) {
        expect(result.data).not.toBeNull();
        expect(user).toBe(UserEntity);
      }
    });
  });
});
