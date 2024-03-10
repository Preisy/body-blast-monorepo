import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AdminPromptController } from '../admin-prompt.controller';
import { PromptEntity } from '../../../../modules/core/prompt/entity/prompt.entity';
import { BasePromptService } from '../../../../modules/core/prompt/base-prompt.service';
import { AdminPromptService } from '../admin-prompt.service';
import { CreatePromptByAdminRequest } from '../dto/admin-create-prompt.dto';
import { FileEntity } from '../../../../modules/core/file/entity/file.entity';

describe('AdminPromptController', () => {
  let controller: AdminPromptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPromptController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
        BasePromptService,
        AdminPromptService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PromptEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FileEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminPromptController>(AdminPromptController);
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: '',
        photoLink: 'biceps.png',
        videoLink: 'undefined/training.mp4',
      };

      await expect(controller.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: '',
        videoLink: 'undefined/training.mp4',
      };

      await expect(controller.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'triceps.png',
        videoLink: '',
      };

      await expect(controller.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: '',
        photoLink: '',
        videoLink: '',
      };

      await expect(controller.create(request)).rejects.toThrow();
    });
  });
});
