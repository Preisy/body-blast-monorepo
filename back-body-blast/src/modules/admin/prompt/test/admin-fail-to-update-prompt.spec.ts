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
import { UpdatePromptByAdminRequest } from '../dto/admin-update-prompt.dto';

describe('AdminPromptController', () => {
  let controller: AdminPromptController;
  let repository: Repository<PromptEntity>;

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
          useValue: {
            save: jest.fn(() => PromptEntity),
            create: jest.fn(() => PromptEntity),
          },
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
    repository = module.get<Repository<PromptEntity>>(getRepositoryToken(PromptEntity));
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptByAdminRequest = {
        type: '',
      };

      await expect(controller.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptByAdminRequest = {
        type: 'new test type',
        photoLink: '',
      };

      await expect(controller.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong data', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptByAdminRequest = {
        type: 'new test type',
        videoLink: '',
      };

      await expect(controller.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong id', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptByAdminRequest = {
        type: 'new test type',
      };

      await expect(controller.update(savedData.id + 5, updateRequest)).rejects.toThrow();
    });
  });
});
