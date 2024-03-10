import { Test, TestingModule } from '@nestjs/testing';
import { AdminFileController } from '../admin-file.controller';
import { AdminFileService } from '../admin-file.service';
import { BaseUserService } from '../../../core/user/base-user.service';
import { AuthService } from '../../../authentication/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../../../core/file/entity/file.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../authentication/entities/token.entity';
import { BaseFileService } from '../../../core/file/base-file.service';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';

describe('AdminFileController', () => {
  let controller: AdminFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminFileController],
      providers: [
        AdminFileService,
        BaseUserService,
        BaseFileService,
        AuthService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: {
            create: jest.fn(() => FileEntity),
            save: jest.fn(() => FileEntity),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        JwtService,
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminFileController>(AdminFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll method', () => {
    it('should return all files', async () => {
      const result = await controller.getUsers(new AppPagination.Request());
      for (const file of result.data) {
        expect(file).not.toBeNull();
        expect(file).toBe(FileEntity);
      }
    });
  });
});
