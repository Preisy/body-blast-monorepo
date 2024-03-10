import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BaseUserService', () => {
  let service: BaseUserService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByEmail method', () => {
    it('should not find user record because of wrong email', async () => {
      const email = 'sdfghjkl';
      expect(service.getUserByEmail(email)).resolves.toBeNull;
    });
  });

  describe('getUserByEmail method', () => {
    it('should not find user record because given email does not exist', async () => {
      const email = 'a5@mail.ru';
      expect(service.getUserByEmail(email)).resolves.toBeNull;
    });
  });
});
